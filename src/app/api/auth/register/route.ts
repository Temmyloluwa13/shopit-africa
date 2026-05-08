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

    // Create user in Supabase with isVerified: false
    const newUser = await prisma.user.create({
      data: { email, passwordHash, name, role, isVerified: false },
    });

    // Generate a random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Save the verification code
    await prisma.verificationCode.create({
      data: {
        code,
        expiresAt,
        userId: newUser.id,
      },
    });

    // Mock sending an email
    console.log(`\n======================================================`);
    console.log(`📧 MOCK EMAIL DISPATCH`);
    console.log(`To: ${newUser.email}`);
    console.log(`Subject: Verify your Shopit Africa email`);
    console.log(`Body: Your verification code is ${code}`);
    console.log(`======================================================\n`);

    return NextResponse.json({
      message: 'Verification code sent',
      requireVerification: true,
      email: newUser.email,
    }, { status: 201 });

    } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}

