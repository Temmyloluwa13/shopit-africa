import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and verification code are required' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { verificationCode: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ error: 'Email is already verified' }, { status: 400 });
    }

    // Verify the code
    const verification = user.verificationCode;
    
    if (!verification) {
      return NextResponse.json({ error: 'No verification code found. Please request a new one.' }, { status: 400 });
    }

    if (verification.code !== code) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    if (new Date() > verification.expiresAt) {
      return NextResponse.json({ error: 'Verification code has expired. Please request a new one.' }, { status: 400 });
    }

    // Update user to verified and delete the code
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true }
      }),
      prisma.verificationCode.delete({
        where: { id: verification.id }
      })
    ]);

    // Sign JWT now that they are verified
    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    const response = NextResponse.json({
      message: 'Email verified successfully. You are now logged in.',
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    }, { status: 200 });

    // Set auth cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 });
  }
}
