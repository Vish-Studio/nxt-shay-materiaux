import { User } from '@/models/user';
import type { UserAuthenticateBodyParams } from '@/types/api/user';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';

import { NextRequest } from 'next/server';

export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const { email, password }: UserAuthenticateBodyParams = await request.json();

    await dbConnect();

    const user = await User.findOne({ email });
    if (!(user && user.password === password)) {
      return createHttpResponse('error', 'Please check your email and password', null, 500);
    }

    // Convert user to a plain object, then delete the password property
    const userData = user.toJSON();
    delete userData.password;

    return createHttpResponse('success', 'Login successful', userData, 200);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal server error', null, 500);
  }
}
