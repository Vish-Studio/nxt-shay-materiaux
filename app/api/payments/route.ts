import { Client } from '@/models/client';
import { Payment } from '@/models/payment';
import { dbConnect } from '@/utils/db-connect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    Client;

    const payments = await Payment.find({}).populate('client').exec();
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
