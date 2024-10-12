import { connect } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

export const dbConnect = async () => {
  try {
    return connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  } catch (exception) {
    throw exception;
  }
};
