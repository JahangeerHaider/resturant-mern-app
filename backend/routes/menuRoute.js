import express from 'express';
import { adminOnly } from '../middlewares/authMiddleware.js';
import {
  addMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  updateMenuItem,
} from '../controllers/menuController.js';
import upload from '../middlewares/multer.js';

const menuRoute = express.Router();

menuRoute.post('/add', adminOnly, upload.single('image'), addMenuItem);

menuRoute.put('/update/:id', adminOnly, upload.single('image'), updateMenuItem);
menuRoute.get('/all', getAllMenuItems);
menuRoute.delete('/delete/:id', adminOnly, deleteMenuItem);

export default menuRoute;
