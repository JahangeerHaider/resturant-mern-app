import express from 'express';
import {
  adminLogin,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/register', registerUser);
authRoute.post('/login', loginUser);
authRoute.post('/admin/login', adminLogin);
authRoute.post('/logout', logoutUser);

export default authRoute;
