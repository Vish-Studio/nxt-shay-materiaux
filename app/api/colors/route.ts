import { Color } from '@/models/color';
import type { IAddColorParams, IDeleteColorParams, IUpdateColorParams } from '@/types/api/color';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';
import { initializeDatabase } from '@/utils/seeds';

export async function GET() {
  try {
    await dbConnect();

    // Initialize database with basic colors if none exist
    await initializeDatabase();

    const colors = await Color.find({}).exec();
    return createHttpResponse('success', 'Colors fetched successfully', colors);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = (await req.json()) as IAddColorParams;
    const { name, hexValue } = body;

    if (!name || !hexValue) {
      return createHttpResponse('fail', 'Name and hexValue are required', null, 400);
    }

    // Check if color with this name already exists
    const existingColor = await Color.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingColor) {
      return createHttpResponse('fail', 'Color with this name already exists', null, 400);
    }

    const newColor = new Color({ name, hexValue });
    await newColor.save();

    return createHttpResponse('success', 'Color created successfully', newColor, 201);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = (await req.json()) as IUpdateColorParams;
    const { id, ...updates } = body;

    if (!id) {
      return createHttpResponse('fail', 'Color id is required', null, 400);
    }

    const updatedColor = await Color.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedColor) {
      return createHttpResponse('fail', 'Color not found', null, 404);
    }

    return createHttpResponse('success', 'Color updated successfully', updatedColor);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const body = (await req.json()) as IDeleteColorParams;
    const { id } = body;

    if (!id) {
      return createHttpResponse('fail', 'Color id is required', null, 400);
    }

    const deletedColor = await Color.findByIdAndDelete(id);

    if (!deletedColor) {
      return createHttpResponse('fail', 'Color not found', null, 404);
    }

    return createHttpResponse('success', 'Color deleted successfully', null);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}
