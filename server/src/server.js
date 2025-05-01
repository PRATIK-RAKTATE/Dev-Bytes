import express from 'express';
import authRoutes  from './routes/auth.route.js'
import dotenv from 'dotenv';

dotenv.config();


import { connectDB } from './db/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/auth", authRoutes);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on the ${PORT}`);
});
