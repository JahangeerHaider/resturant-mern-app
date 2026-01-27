import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
dotenv.config();

const app = express();
// DB connection
connectDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}`);
});
