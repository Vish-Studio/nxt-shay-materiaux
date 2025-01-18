import { Payment } from '@/models/payment';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';

export async function GET() {
  try {
    await dbConnect();

    const payments = await Payment.find({}).exec();
    return createHttpResponse('success', 'Payments fetched successfully', payments);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}
