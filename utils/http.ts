import type { TResponseStatus } from '@/types/api/base';
import { NextResponse } from 'next/server';

export const createHttpResponse = <T = unknown>(
  status: TResponseStatus,
  message: string,
  data: T | null = null,
  statusCode = 200
) => {
  return NextResponse.json({ status, message, data, statusCode }, { status: statusCode });
};
