import express from 'express';
import {
  addCategory,
  deleteCategory,
  getAllcategory,
  updateCategory,
} from '../controllers/categoryController.js';
import { adminOnly } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const categoryRoute = express.Router();

categoryRoute.post('/add', adminOnly, upload.single('image'), addCategory);
categoryRoute.put(
  '/update/:id',
  adminOnly,
  upload.single('image'),
  updateCategory,
);
categoryRoute.delete('/delete/:id', adminOnly, deleteCategory);
categoryRoute.get('/all', getAllcategory);

export default categoryRoute;
