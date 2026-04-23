import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, this would use Prisma: 
  // const products = await prisma.product.findMany({ take: 10 });
  
  return NextResponse.json({
    message: "Products fetched successfully",
    data: [
      {
        id: '1',
        name: 'Luxury Wireless Over-Ear Headphones, Soft Gold Accent',
        price: 45000,
        category: 'Electronics',
        isFlashSale: true,
      },
      {
        id: '2',
        name: 'Premium Vibrant Orange & Charcoal Sneakers',
        price: 32500,
        category: 'Fashion',
        isFlashSale: true,
      }
    ]
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    // ...
    
    // Create product in DB
    // const newProduct = await prisma.product.create({ data: body });
    
    return NextResponse.json({
      message: "Product created successfully",
      // data: newProduct
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
