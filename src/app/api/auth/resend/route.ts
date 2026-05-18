import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send real email via Resend
    await resend.emails.send({
      from: 'Shopit Africa <onboarding@resend.dev>',
      to: user.email,
      subject: 'Your new Shopit Africa verification code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello!</h2>
          <p>You requested a new verification code for your Shopit Africa account. Please use the code below:</p>
          <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 5px; text-align: center; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 15 minutes.</p>
        </div>
      `
    });

    return NextResponse.json({
      message: 'Verification code resent successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to resend verification code' }, { status: 500 });
  }
}
