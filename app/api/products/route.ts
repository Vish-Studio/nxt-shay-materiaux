import { Product } from '@/models/product';
import { dbConnect } from '@/utils/db-connect';
import { createHttpResponse } from '@/utils/http';

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({}).populate('category').exec();

    return createHttpResponse('success', 'Products fetched successfully', products);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, quantity, category, price, buyingPrice, moreInfo } = body;

    if (!name || quantity == null || !price || !buyingPrice || !category) {
      return createHttpResponse(
        'fail',
        'Required fields are missing: name, quantity, price, buyingPrice, and category',
        null,
        400
      );
    }

    const newProduct = new Product({ name, quantity, category, price, buyingPrice, moreInfo });
    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id).populate('category');

    return createHttpResponse('success', 'Product created successfully', populatedProduct, 201);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return createHttpResponse('fail', 'Product id is required', null, 400);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true }).populate(
      'category'
    );

    if (!updatedProduct) {
      return createHttpResponse('fail', 'Product not found', null, 404);
    }

    return createHttpResponse('success', 'Product updated successfully', updatedProduct);
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
      return createHttpResponse('fail', 'Product id is required', null, 400);
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return createHttpResponse('fail', 'Product not found', null, 404);
    }

    return createHttpResponse('success', 'Product deleted successfully', null);
  } catch (error) {
    console.error(error);
    return createHttpResponse('error', 'Internal Server Error', null, 500);
  }
}
