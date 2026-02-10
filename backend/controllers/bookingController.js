import Booking from '../models/bookingModel.js';
import User from '../models/userModel.js';

// Creating Booking......

export const createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, numberOfPeople, date, time, note } = req.body;

    if (!name || !phone || !numberOfPeople || !date || !time || !note) {
      return res
        .status(400)
        .json({ message: 'All feilds are required', success: false });
    }

    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: 'Cancelled' },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: 'With this time slot the tabel already book',
        success: false,
      });
    }

    const booking = await Booking.create({
      user: id,
      name,
      phone,
      numberOfPeople,
      time,
      date,
      note,
    });
    res
      .status(200)
      .json({ message: 'Tabel Booked successfully', success: true, booking });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Internal server error', success: false });
  }
};

// Geting user booking.....

export const getUserBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const booking = await Booking.find({ user: id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ booking, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Internal server error', success: false });
  }
};

// geting all user booking by admin.......

export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email');
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Internal server error', success: false });
  }
};

// update booking status ....
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const { status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = status;
    await booking.save();
    res
      .status(200)
      .json({ success: true, message: 'Booking status updated', booking });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Internal server error', success: false });
  }
};
