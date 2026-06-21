import { NextResponse } from 'next/server';
import { getDb, saveDb, Product } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const product = db.products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Fetch product detail error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = await getDb();
    const productIndex = db.products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const currentProduct = db.products[productIndex];
    const updatedProduct: Product = {
      ...currentProduct,
      title: body.title ?? currentProduct.title,
      description: body.description ?? currentProduct.description,
      price: body.price !== undefined ? parseFloat(body.price) : currentProduct.price,
      category: body.category ?? currentProduct.category,
      businessType: body.businessType ?? currentProduct.businessType,
      image: body.image ?? currentProduct.image,
      stock: body.stock !== undefined ? parseInt(body.stock) : currentProduct.stock,
      specs: body.specs ?? currentProduct.specs,
    };

    db.products[productIndex] = updatedProduct;
    await saveDb(db);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const productIndex = db.products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    db.products.splice(productIndex, 1);
    await saveDb(db);

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
