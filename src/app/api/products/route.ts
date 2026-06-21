import { NextResponse } from 'next/server';
import { getDb, saveDb, Product } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessType = searchParams.get('businessType');
    
    const db = await getDb();
    let products = db.products;

    if (businessType === 'solar' || businessType === 'mushroom') {
      products = products.filter((p) => p.businessType === businessType);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, category, businessType, image, stock, specs } = body;

    if (!title || !price || !category || !businessType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDb();
    
    // Generate a unique ID
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const uniqueId = `${businessType}-${slug}-${Date.now().toString().slice(-4)}`;

    const newProduct: Product = {
      id: uniqueId,
      title,
      description: description || '',
      price: parseFloat(price),
      category,
      businessType,
      image: image || '/logo.jpg',
      stock: parseInt(stock) || 0,
      specs: specs || {},
    };

    db.products.push(newProduct);
    await saveDb(db);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
