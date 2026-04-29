import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractTokenFromHeader, extractTokenFromCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Authenticate user
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');
    const user = extractTokenFromHeader(authHeader) || extractTokenFromCookie(cookieHeader);

    if (!user) {
      return NextResponse.json({ error: 'You must be logged in to place an order' }, { status: 401 });
    }

    const body = await request.json();
    const { items, shippingAddress, paymentMethod } = body;

    // Validate inputs
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
    }
    if (!shippingAddress) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }
    if (!paymentMethod) {
      return NextResponse.json({ error: 'Payment method is required' }, { status: 400 });
    }

    // Fetch all products in order to get current prices and check stock
    const productIds = items.map((item: { productId: string }) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: 'One or more products not found' }, { status: 404 });
    }

    // Build order items and check stock
    const orderItemsData: { productId: string; quantity: number; priceAtPurchase: number }[] = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for "${product.name}". Available: ${product.stock}` },
          { status: 409 }
        );
      }

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    // Create order + items and decrement stock — all in one transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create the order with its items
      const newOrder = await tx.order.create({
        data: {
          userId: user.userId,
          totalAmount,
          status: 'PENDING',
          paymentMethod,
          shippingAddress,
          items: {
            create: orderItemsData,
          },
        },
        include: { items: true },
      });

      // Decrement stock for each product
      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return NextResponse.json({
      message: 'Order placed successfully',
      data: order,
    }, { status: 201 });

  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // Authenticate user
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');
    const user = extractTokenFromHeader(authHeader) || extractTokenFromCookie(cookieHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.userId },
      include: {
        items: {
          include: { product: { select: { name: true, images: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ message: 'Orders fetched successfully', data: orders });
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
