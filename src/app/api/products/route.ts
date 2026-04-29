import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractTokenFromHeader, extractTokenFromCookie } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { vendor: { select: { storeName: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      message: 'Products fetched successfully',
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Authenticate — accept token from header or cookie
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');
    const user = extractTokenFromHeader(authHeader) || extractTokenFromCookie(cookieHeader);

    if (!user || user.role !== 'VENDOR') {
      return NextResponse.json({ error: 'Unauthorized — vendor access only' }, { status: 401 });
    }

    if (!user.vendorId) {
      return NextResponse.json({ error: 'Vendor profile not found' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, price, stock, category, images } = body;

    if (!name || !description || !price || !category) {
      return NextResponse.json({ error: 'name, description, price and category are required' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock || 0, 10),
        category,
        images: images || 'placeholder.jpg',
        vendorId: user.vendorId,
      },
    });

    return NextResponse.json({ message: 'Product created successfully', data: product }, { status: 201 });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

