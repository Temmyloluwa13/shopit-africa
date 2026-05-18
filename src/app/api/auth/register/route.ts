import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send real email via Resend
    await resend.emails.send({
      from: 'Shopit Africa <onboarding@resend.dev>',
      to: newUser.email,
      subject: 'Verify your Shopit Africa email',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to Shopit Africa, ${newUser.name}!</h2>
          <p>Thank you for creating an account. Please verify your email address using the code below:</p>
          <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 5px; text-align: center; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 15 minutes.</p>
        </div>
      `
    });

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

