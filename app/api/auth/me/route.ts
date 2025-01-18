import { User } from '@/models/user';
import type { UserMeBodyParams } from '@/types/api/user';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id }: UserMeBodyParams = await request.json();

    await dbConnect();

    const user = await User.findById(id);
    if (!user) {
      return createHttpResponse('error', 'User cannot be found', null, 500);
    }

    // Convert user to a plain object, then delete the password property
    const userData = user.toJSON();
    delete userData.password;

    return createHttpResponse('success', 'User found successfully', userData, 200);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal server error', null, 500);
  }
}
