import { Client } from '@/models/client';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';

export async function GET() {
  try {
    await dbConnect();

    const clients = await Client.find({}).populate('shops').populate('payments').exec();

    return createHttpResponse('success', 'Clients fetched successfully', clients);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}
