import express from "express";
import env from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";
import cluster from "node:cluster";
import os from "node:os";

import { connectDB } from "./config/db.js";
import { envSchema } from "./config/constants.js";
import { ApiError } from "./utils/ApiError.js";

import redisClient from "./config/redis.js";
import authRouter from "./routes/auth.route.js";

env.config();
const { error } = envSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

const app = express();

// security middlewares
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data", "https://*cloudnary.com"],
        connectSrc: ["'self'", process.env.CLIENT_URL],
      },
    },
    crossOriginEmbedderPolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-with"],
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

// request sanitization
app.use(mongoSanitize()); // prevent noSQL injection
app.use(xss()); // prevent xss attack
app.use(
  hpp({
    // prevent parameter pollution
    whitelist: ["duration", "ratings"],
  })
);

// performance optimization
app.use(
  compression({
    level: 6,
    threshold: "1kb",
    filter: (req, res) => {
      if (req.header["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  })
);

app.use(express.static("public", { maxAge: "7d" })); //static file caching

// rate limiting
const redisRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // req per ip
  store: new RedisStore({
    client: redisClient,
    prefix: "rl:",
  }),
  handler: (req, res) => {
    throw new ApiError(429, "Too many requests, please try again later");
  },
});

app.use("/api", redisRateLimiter);

// db connection
const startServer = async () => {
  await connectDB();
  await redisClient.connect();
};

// Routes
app.use("/api/v1/auth", authRouter);

// health check endpoint
app.get("/health", (req, res) =>
  res.status(200).json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    redis: redisClient.isOpen ? "connected" : "disconnected",
  })
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server! `,
  });
});

// global error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const response = {
    status: err.status,
    message: err.message,
  };

  if (process.env.NODE_ENV == "production") {
    // dont leak error details in production
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    if (err instanceof mongoose.Error.ValidationError) {
      response.message = "Validation failed";
      response.errors = Object.values(err.errors).map((e) => e.message);
    }
  } else {
    // detailed error in deverlopement
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
});

// server init

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(
    `Worker ${process.pid} running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// gracefull shutdown
const shutdown = async (signal) => {
  console.log(`Recieved ${signal}, closing server... `);
  await redisClient.quit();
  await mongoose.disconnect();
  server.close(() => {
    console.log(`Server closed`);
    process.exit(0);
  });

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err.name, err.message);
    shutdown("unhandled rejection");
  });
  process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err.name, err.message);
    shutdown("uncaught exception");
  });
};

// cluster management 
if (cluster.isPrimary && process.env.NODE_ENV === 'production') {
  const numCPUs = os.cpus().length;
  console.log(` Master ${process.pid} started (${numCPUs} workers)`);

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(` Worker ${worker.process.pid} died (${signal || code})`);
    if (code !== 0) cluster.fork();
  });
} else {
  startServer().catch(err => {
    console.error(' Failed to start server:', err);
    process.exit(1);
  });
}