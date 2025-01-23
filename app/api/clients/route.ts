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

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const {
      createDateTime,
      firstName,
      lastName,
      nid,
      brnNumber,
      phoneNumber,
      mobileNumber,
      shops,
      deliveryDateTime,
      payments
    } = body;

    // if (!name || quantity == null || !price || !buyingPrice || !category) {
    //   return createHttpResponse(
    //     'fail',
    //     'Required fields are missing: name, quantity, price, buyingPrice, and category',
    //     null,
    //     400
    //   );
    // }

    const newClient = new Client({
      createDateTime,
      firstName,
      lastName,
      nid,
      brnNumber,
      phoneNumber,
      mobileNumber,
      shops,
      deliveryDateTime,
      payments
    });
    await newClient.save();

    const populatedClient = await Client.findById(newClient._id).populate('');

    return createHttpResponse('success', 'Product created successfully', populatedClient, 201);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}
