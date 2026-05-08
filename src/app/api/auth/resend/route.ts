import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
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

    // Generate a new 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    if (user.verificationCode) {
      // Update existing code
      await prisma.verificationCode.update({
        where: { id: user.verificationCode.id },
        data: { code, expiresAt }
      });
    } else {
      // Create new code if none exists
      await prisma.verificationCode.create({
        data: {
          code,
          expiresAt,
          userId: user.id
        }
      });
    }

    // Mock sending an email
    console.log(`\n======================================================`);
    console.log(`📧 MOCK EMAIL DISPATCH (RESEND)`);
    console.log(`To: ${user.email}`);
    console.log(`Subject: Your new Shopit Africa verification code`);
    console.log(`Body: Your new verification code is ${code}`);
    console.log(`======================================================\n`);

    return NextResponse.json({
      message: 'Verification code resent successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to resend verification code' }, { status: 500 });
  }
}
