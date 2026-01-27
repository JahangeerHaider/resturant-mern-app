import mongoose from 'mongoose';

export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database conected');
  } catch (err) {
    console.log(`err in connecting to database ${err}`);
  }
};
