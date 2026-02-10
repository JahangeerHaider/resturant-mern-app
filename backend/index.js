import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import connectCloudinary from './config/cloudinary.js';
import menuRoute from './routes/menuRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';
import bookingRoute from './routes/bookingRoute.js';

dotenv.config();

const app = express();
// DB connection
connectDB();
// cloudinary connection
connectCloudinary();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'https://resturant-mern-app.vercel.app/',
    credentials: true,
  }),
);
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/menu', menuRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/booking', bookingRoute);

app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}`);
});
