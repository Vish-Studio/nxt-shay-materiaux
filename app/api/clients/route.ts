import { Client } from '@/models/client';
import { Payment } from '@/models/payment';
import { Shop } from '@/models/shop';
import { dbConnect } from '@/utils/db-connect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    Payment;
    Shop;

    const clients = await Client.find({}).populate('shops').populate('payments').exec();
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
