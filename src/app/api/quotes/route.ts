import { NextResponse } from 'next/server';
import { getDb, saveDb, Quote } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const db = await getDb();
    const quotes = db.quotes || [];
    // Sort quotes by date descending
    quotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Failed to get quotes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, companyName, phone, email, productRequirement, quantity, message } = await request.json();

    if (!name || !email || !productRequirement || !quantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    if (!db.quotes) {
      db.quotes = [];
    }

    const newQuote: Quote = {
      id: `quote-${Date.now()}`,
      name,
      companyName: companyName || '',
      phone: phone || '',
      email,
      productRequirement,
      quantity: Number(quantity),
      message: message || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    db.quotes.push(newQuote);
    await saveDb(db);

    return NextResponse.json(newQuote, { status: 201 });
  } catch (error) {
    console.error('Failed to save quote:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
