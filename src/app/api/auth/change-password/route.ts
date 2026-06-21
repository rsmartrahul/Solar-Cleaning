import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, oldPassword, newPassword } = await request.json();

    if (!email || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Email, current password, and new password are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const userIndex = db.users.findIndex(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === oldPassword
    );

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'Incorrect current password' },
        { status: 401 }
      );
    }

    db.users[userIndex].password = newPassword;
    await saveDb(db);

    return NextResponse.json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
