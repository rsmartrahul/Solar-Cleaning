import { NextResponse } from 'next/server';
import { getDb, saveDb, Order } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { orderStatus, paymentStatus } = body;

    const db = await getDb();
    const orderIndex = db.orders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const currentOrder = db.orders[orderIndex];
    const updatedOrder: Order = {
      ...currentOrder,
      orderStatus: orderStatus ?? currentOrder.orderStatus,
      paymentStatus: paymentStatus ?? currentOrder.paymentStatus,
    };

    db.orders[orderIndex] = updatedOrder;
    await saveDb(db);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
