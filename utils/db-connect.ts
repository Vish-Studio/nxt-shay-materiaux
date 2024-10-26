import mongoose, { connect } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

export const dbConnect = async () => {
  try {
    // Ensure a single connection
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await connect(MONGODB_URI);
  } catch (exception) {
    console.error('Database connection error:', exception);
    throw exception;
  }
};
