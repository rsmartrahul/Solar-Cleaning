import { NextResponse } from 'next/server';
import { getDb, saveDb, User } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const exists = db.users.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    const newUser: User = {
      email: email.toLowerCase(),
      password,
      name,
      role: 'user', // Default registered users are customers
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    await saveDb(db);

    const token = btoa(JSON.stringify({ email: newUser.email, role: newUser.role, time: Date.now() }));

    return NextResponse.json(
      {
        message: 'Registration successful',
        token,
        user: {
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
