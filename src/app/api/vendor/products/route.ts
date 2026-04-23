import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('productName') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string, 10);
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    
    // For demo purposes, grab the first vendor profile in the DB since we don't have session cookies wired up yet
    const vendor = await prisma.vendorProfile.findFirst();
    
    if (!vendor) {
      return NextResponse.redirect(new URL('/vendor/dashboard/products/new?error=no_vendor', request.url), 302);
    }

    // Insert Product into SQLite database
    const product = await prisma.product.create({
      data: {
        name,
        price,
        stock,
        category,
        description,
        images: "placeholder.jpg", // Mock since image upload handling requires S3/Cloudinary 
        vendorId: vendor.id,
      }
    });

    console.log("Product successfully created:", product);

    // Redirect to dashboard layout on success
    return NextResponse.redirect(new URL('/vendor/dashboard', request.url), 302);
  } catch (error) {
    console.error("Product Creation Error:", error);
    return NextResponse.redirect(new URL('/vendor/dashboard/products/new?error=failed', request.url), 302);
  }
}
