import { Category } from '@/models/category';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find({}).exec();
    return createHttpResponse('success', 'Categories fetched successfully', categories);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return createHttpResponse('fail', 'Name is required', null, 400);
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    return createHttpResponse('success', 'Category created successfully', newCategory, 201);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, name } = body;

    if (!id || !name) {
      return createHttpResponse('fail', 'Both id and name are required', null, 400);
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedCategory) {
      return createHttpResponse('fail', 'Category not found', null, 404);
    }

    return createHttpResponse('success', 'Category updated successfully', updatedCategory);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return createHttpResponse('fail', 'id is required', null, 400);
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return createHttpResponse('fail', 'Category not found', null, 404);
    }

    return createHttpResponse('success', 'Category deleted successfully', null);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}
