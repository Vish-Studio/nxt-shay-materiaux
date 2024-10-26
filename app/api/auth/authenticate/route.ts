import { User } from '@/models/user';
import type { UserAuthenticateBodyParams } from '@/types/api/user';
import { dbConnect } from '@/utils/db-connect';

import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const { email, password }: UserAuthenticateBodyParams = await request.json();

    await dbConnect();

    const user = await User.findOne({ email });
    if (!(user && user.password === password)) {
      return NextResponse.json(
        { message: 'Please check your email and password' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ...user.toJSON() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
