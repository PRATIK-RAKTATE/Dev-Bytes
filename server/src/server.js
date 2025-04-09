import express from 'express';
import env from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';
import cluster from 'node:cluster';
import os from 'node:os';

env.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const app = express();

// security middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL}));
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb'}))

// request sanitization
app.use(mongoSanitize()); // prevent noSQL injection
app.use(xss()); // prevent xss attack
app.use(hpp()); // prevent parameter pollution

// performance optimization
app.use(compression()); 
app.use(express.static('public', { maxAge: '7d' })); //static file caching

// rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 min
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // req per ip
  message: 'Too many requests please try after some time'
});

app.use('/api', limiter);

// health check endpoint
app.get('/health', (req, res) => res.status(200).json({status: 'ok' }));


// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server! `
  });
});

// global error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status  = err.status || 'error';

  if (process.env.NODE_ENV == 'production') {
    // dont leak error details in production
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // detailed error in deverlopement
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  }
});

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

if (cluster.isPrimary && process.env.NODE_ENV === 'production') {
  // cluster mode for production
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

} else {
  app.listen(PORT, () => {
    console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT} `);
    console.log(`Worker ${process.pid} started`);
  });
}

// handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection shutting down...');
  console.error(err.name, err.message);
  server.close(() => process.exit(1));
});

// handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION Shutting down....');
  console.error(err.name, err.message);
  process.exit(1);
});
