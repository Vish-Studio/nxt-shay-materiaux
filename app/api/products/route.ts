import { Product } from '@/models/product';
import type {
  IAddProductParams,
  IDeleteProductParams,
  IUpdateProductParams
} from '@/types/api/product';
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

    const body = (await req.json()) as IAddProductParams;
    const { name, quantity, category, price, buyingPrice, paymentStatus, moreInfo } = body;

    if (!name || quantity == null || !price || !buyingPrice || !category || !paymentStatus) {
      return createHttpResponse(
        'fail',
        'Required fields are missing: name, quantity, price, buyingPrice, category and paymentStatus',
        null,
        400
      );
    }

    const newProduct = new Product({
      name,
      quantity,
      category,
      price,
      buyingPrice,
      paymentStatus,
      moreInfo
    });
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

    const body = (await req.json()) as IUpdateProductParams;
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

    const body = (await req.json()) as IDeleteProductParams;
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
