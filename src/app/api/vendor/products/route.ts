import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractTokenFromHeader, extractTokenFromCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Authenticate vendor from JWT token
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');
    const user = extractTokenFromHeader(authHeader) || extractTokenFromCookie(cookieHeader);

    if (!user || user.role !== 'VENDOR') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url), 302);
    }

    if (!user.vendorId) {
      return NextResponse.redirect(new URL('/vendor/register?error=no_profile', request.url), 302);
    }

    const formData = await request.formData();
    const name = formData.get('productName') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string, 10);
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    if (!name || !price || !category || !description) {
      return NextResponse.redirect(
        new URL('/vendor/dashboard/products/new?error=missing_fields', request.url), 302
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        stock: isNaN(stock) ? 0 : stock,
        category,
        description,
        images: 'placeholder.jpg',
        vendorId: user.vendorId,
      },
    });

    console.log('Product successfully created:', product.id);
    return NextResponse.redirect(new URL('/vendor/dashboard', request.url), 302);
  } catch (error) {
    console.error('Product Creation Error:', error);
    return NextResponse.redirect(
      new URL('/vendor/dashboard/products/new?error=failed', request.url), 302
    );
  }
}

