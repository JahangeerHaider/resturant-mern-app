import Category from '../models/categoryModel.js';
import { v2 as cloudinary } from 'cloudinary';

// Adding Category.....
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !req.file) {
      return res
        .status(404)
        .json({ message: 'name and image are required', success: false });
    }

    const alreadyExist = await Category.findOne({ name });
    if (alreadyExist) {
      return res
        .status(400)
        .json({ message: 'Category already exist', success: false });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const newCategory = await Category.create({
      name,
      image: result.secure_url,
    });
    res.json({
      message: 'category added',
      success: true,
      category: newCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// getting All category....

export const getAllcategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// Updating category.....

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ message: 'category not found', success: false });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      category.image = result.secure_url;
    }

    if (name) category.name = name;
    await category.save();
    res.status(200).json({ message: 'category updated', success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// Deleting category.....

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({ message: 'category not found', success: false });
    }
    res.status(200).json({ message: 'category deleted', success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};
