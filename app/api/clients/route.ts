import { Client } from '@/models/client';
import { Shop } from '@/models/shop';
import { IAddClientParams } from '@/types/api/client';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';
import { ObjectId } from 'mongoose';

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

    const body = (await req.json()) as IAddClientParams;
    const {
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

    let shopId = null;
    // @todo to check if a required field is needed, consult product route.
    if (shops) {
      const newShop = new Shop(shops[0]);
      shopId = newShop._id;
      await newShop.save();
    }

    const newClient = new Client({
      firstName,
      lastName,
      nid,
      brnNumber,
      phoneNumber,
      mobileNumber,
      shops: [shopId],
      deliveryDateTime,
      payments
    });
    await newClient.save();

    const populatedClient = await Client.findById(newClient._id)
      .populate('shops')
      .populate('payments')
      .exec();

    return createHttpResponse('success', 'Client created successfully', populatedClient, 201);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}
