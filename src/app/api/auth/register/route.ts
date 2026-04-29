import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, name, role = 'CUSTOMER' } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user in Supabase
    const newUser = await prisma.user.create({
      data: { email, passwordHash, name, role },
    });

    // Sign JWT
    const token = signToken({ userId: newUser.id, email: newUser.email, role: newUser.role });

    const response = NextResponse.json({
      message: 'User registered successfully',
      user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
      token,
    }, { status: 201 });

    // Also set token as an HTTP-only cookie for web clients
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}

