import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from '../controllers/cartController.js';

const cartRoute = express.Router();

cartRoute.post('/add', protect, addToCart);
cartRoute.get('/all', protect, getCart);
cartRoute.delete('/delete/:menuId', protect, removeFromCart);
cartRoute.put('/update', protect, updateCartQuantity);

export default cartRoute;
