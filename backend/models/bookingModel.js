import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['Pending', 'Cancelled', 'Approved'],
      default: 'Pending',
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
