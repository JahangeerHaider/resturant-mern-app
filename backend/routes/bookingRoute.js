import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  createBooking,
  getAllBooking,
  getUserBooking,
  updateBookingStatus,
} from '../controllers/bookingController.js';

const bookingRoute = express.Router();

bookingRoute.post('/create', protect, createBooking);
bookingRoute.get('/my-bookings', protect, getUserBooking);
bookingRoute.get('/all-bookings', adminOnly, getAllBooking);
bookingRoute.put('/update-status/:bookingId', adminOnly, updateBookingStatus);

export default bookingRoute;
