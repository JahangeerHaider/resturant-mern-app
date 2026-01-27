import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// generate jwt...

const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};

// Registerd user

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'please fill all the feilds', success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User with this email already exist',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return res
      .status(201)
      .json({ message: 'Registerd successfully', success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// Login User....

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'please fill all the feilds', success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User does not exist', success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'invalid cridentials', success: false });
    }

    generateToken(res, { id: user._id, role: user.isAdmin ? 'Admin' : 'user' });
    return res.status(200).json({
      message: 'login successfully',
      succes: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// Admin login....

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'fill all the fields', success: false });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res
        .status(401)
        .json({ message: 'invalid cridentials', success: false });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: 'admin login successfully', success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// Logout user....

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    return res
      .status(200)
      .json({ message: 'Logout successfully', success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};
