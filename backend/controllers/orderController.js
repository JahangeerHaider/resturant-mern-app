import Order from '../models/orderSchema.js';
import Cart from '../models/cartModel.js';

// placing order.....
export const placeOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { address, paymentMethod } = req.body || {};
    if (!address) {
      return res
        .status(400)
        .json({ message: 'Address are required', succcess: false });
    }

    const cart = await Cart.findOne({ user: id }).populate('items.menuItem');

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ message: 'your cart is empty', success: false });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0,
    );

    const newOrder = await Order.create({
      user: id,
      items: cart.items.map((i) => ({
        menuItem: i.menuItem._id,
        quantity: i.quantity,
      })),
      totalAmount,
      address,
      paymentMethod,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// Geting user orders.....

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// geting all orders.....

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.menuItem')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: 'All orders ', orders });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};

// updating oreder.....

export const updatingOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: ' order updated', success: true, order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'internal server error', success: false });
  }
};
