import express from 'express';
import {
  adminLogin,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const authRoute = express.Router();

authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/admin/login', adminLogin);
authRoute.post('/logout', logoutUser);
authRoute.get('/profile', protect, getProfile);

export default authRoute;
