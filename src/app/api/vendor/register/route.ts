// src/app/api/vendor/register/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const storeName = formData.get('storeName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string; // in a real app, hash this!
    const category = formData.get('category') as string;

    // 1. Create the user
    const user = await prisma.user.create({
      data: {
        name: storeName,
        email: email,
        passwordHash: password, // Store plain text just for this MVP demo
        role: "VENDOR",
        vendorProfile: {
          create: {
            storeName: storeName,
            description: `A premium vendor selling ${category}`,
          }
        }
      }
    });

    // Directly redirect to dashboard after "registration"
    return NextResponse.redirect(new URL('/vendor/dashboard', request.url), 302);
  } catch (error) {
    console.error("Vendor Registration Error:", error);
    // Redirect back to register on failure (with error query in a real app)
    return NextResponse.redirect(new URL('/vendor/register?error=failed', request.url), 302);
  }
}
