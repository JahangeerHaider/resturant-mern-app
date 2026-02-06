import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  updatingOrder,
} from '../controllers/orderController.js';

const orderRoute = express.Router();

orderRoute.post('/place', protect, placeOrder);

orderRoute.get('/my-orders', protect, getUserOrders);

orderRoute.get('/orders', adminOnly, getAllOrders);

orderRoute.put('/update-status/:orderId',adminOnly,updatingOrder);

export default orderRoute;
