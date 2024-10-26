import { User } from '@/models/user';
import type { UserMeBodyParams } from '@/types/api/user';
import { dbConnect } from '@/utils/db-connect';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id }: UserMeBodyParams = await request.json();

    await dbConnect();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User cannot be found' }, { status: 500 });
    }

    // Convert user to a plain object, then delete the password property
    const userData = user.toJSON();
    delete userData.password;

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
