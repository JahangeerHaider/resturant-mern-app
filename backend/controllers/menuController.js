import Menu from '../models/menuModel.js';
import { v2 as cloudinary } from 'cloudinary';

// adding menu item.....

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !req.file) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });

    return res.status(200).json({
      message: 'Menu Item added',
      success: true,
      menuItem: newMenuItem,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// getting all menu item .....

export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'All menu item here',
      success: true,
      menuItems,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// updating menuItem.....

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, isAvailabel } = req.body;

    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res
        .status(404)
        .json({ meassage: 'Item not found', sucess: false });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      menuItem.image = result.secure_url;
    }

    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (isAvailabel !== undefined) menuItem.isAvailabel = isAvailabel;
    await menuItem.save();
    return res
      .status(200)
      .json({ message: 'Menu item updated', success: true, menuItem });
  } catch (error) {
    res.status(500).json({ message: 'internal server error', success: false });
  }
};

// deleting menu item....

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findByIdAndDelete(id);
    if (!menuItem) {
      res.status(404).json({ message: 'Menu item not found', success: false });
    }
    res.status(200).json({ message: 'menu item deleted', success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};
