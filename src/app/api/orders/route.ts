import { NextResponse } from 'next/server';
import { getDb, saveDb, Order, OrderItem } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const db = await getDb();
    let orders = db.orders;

    if (email) {
      orders = orders.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase());
    }

    // Sort orders by newest first
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerEmail, customerName, items, totalAmount, shippingAddress, paymentMethod } = body;

    if (!customerEmail || !items || !items.length || !totalAmount || !shippingAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Verify stock and update product inventory
    for (const item of items) {
      const dbProduct = db.products.find((p) => p.id === item.id);
      if (!dbProduct) {
        return NextResponse.json(
          { error: `Product with ID ${item.id} not found` },
          { status: 400 }
        );
      }
      if (dbProduct.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product: ${dbProduct.title}. Only ${dbProduct.stock} left.` },
          { status: 400 }
        );
      }
      // Deduct stock
      dbProduct.stock -= item.quantity;
    }

    const newOrder: Order = {
      id: `order-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerEmail: customerEmail.toLowerCase(),
      customerName,
      items: items as OrderItem[],
      totalAmount: parseFloat(totalAmount),
      shippingAddress,
      paymentMethod: paymentMethod || 'Card',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid', // Simulating instant card payment
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
    };

    db.orders.push(newOrder);
    await saveDb(db);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
