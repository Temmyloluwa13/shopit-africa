import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const storeName = formData.get('storeName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const category = formData.get('category') as string;

    if (!storeName || !email || !password) {
      return NextResponse.redirect(new URL('/vendor/register?error=missing_fields', request.url), 302);
    }

    // Check if email is already taken
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.redirect(new URL('/vendor/register?error=email_taken', request.url), 302);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user + vendor profile in a single transaction
    const user = await prisma.user.create({
      data: {
        name: storeName,
        email,
        passwordHash,
        role: 'VENDOR',
        vendorProfile: {
          create: {
            storeName,
            description: `A premium vendor selling ${category || 'products'}`,
          },
        },
      },
      include: { vendorProfile: true },
    });

    // Sign JWT with vendorId so subsequent requests can identify this vendor
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      vendorId: user.vendorProfile?.id,
    });

    const response = NextResponse.redirect(new URL('/vendor/dashboard', request.url), 302);
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Vendor Registration Error:', error);
    return NextResponse.redirect(new URL('/vendor/register?error=failed', request.url), 302);
  }
}

