import { prisma } from '../lib/prisma';
import { MOCK_PRODUCTS } from '../data/mockProducts';

async function main() {
  console.log('🌱 Starting Database Seeding...');

  // 1. Ensure the user and vendor exist
  const adminEmail = 'admin@shopit.africa';
  
  let adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    console.log('👤 Creating Admin User...');
    adminUser = await prisma.user.create({
      data: {
        name: 'Shopit Admin',
        email: adminEmail,
        passwordHash: 'dummy_hash', // We will set proper passwords in Phase 2
        role: 'ADMIN',
      },
    });
  }

  let vendorProfile = await prisma.vendorProfile.findUnique({
    where: { userId: adminUser.id },
  });

  if (!vendorProfile) {
    console.log('🏪 Creating System Vendor Profile...');
    vendorProfile = await prisma.vendorProfile.create({
      data: {
        storeName: 'Shopit Africa Official',
        description: 'The official multi-category vendor for Shopit Africa.',
        userId: adminUser.id,
      },
    });
  }

  console.log(`✅ Vendor Profile ready. ID: ${vendorProfile.id}`);

  // 2. Extract exactly 5000 random products to ensure performance and prevent massive bloat
  const TOTAL_TO_SEED = 5000;
  
  // Shuffle array simply and slice 5000
  console.log(`📦 Slicing ${TOTAL_TO_SEED} random products from total ${MOCK_PRODUCTS.length} generated...`);
  const shuffledProducts = [...MOCK_PRODUCTS].sort(() => 0.5 - Math.random());
  const selectedProducts = shuffledProducts.slice(0, TOTAL_TO_SEED);

  // 3. Map to Prisma Schema
  const productsToInsert = selectedProducts.map((p) => ({
    name: p.name,
    description: `A premium ${p.category} product provided by Shopit Africa Official.`,
    price: p.price,
    stock: p.itemsLeft || Math.floor(Math.random() * 100) + 10,
    category: p.category,
    images: p.image,
    vendorId: vendorProfile.id,
  }));

  console.log(`🚀 Inserting ${productsToInsert.length} products to Supabase...`);
  
  // Supabase limits payload size, chunking by 1000 is safe
  const CHUNK_SIZE = 1000;
  for (let i = 0; i < productsToInsert.length; i += CHUNK_SIZE) {
    const chunk = productsToInsert.slice(i, i + CHUNK_SIZE);
    
    await prisma.product.createMany({
      data: chunk,
      skipDuplicates: true, // Prevents errors if rerun
    });
    console.log(`✅ Inserted chunk ${Math.floor(i/CHUNK_SIZE) + 1} / ${Math.ceil(productsToInsert.length / CHUNK_SIZE)}`);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
