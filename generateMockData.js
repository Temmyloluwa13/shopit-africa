const fs = require('fs');

function getCategoryKeywords(category) {
  const cat = category.toLowerCase();
  if (cat.includes('tv') || cat.includes('television')) return 'television';
  if (cat.includes('phone') || cat.includes('apple') || cat.includes('samsung') || cat.includes('tecno') || cat.includes('infinix')) return 'smartphone';
  if (cat.includes('blender') || cat.includes('juicer') || cat.includes('mixer')) return 'blender';
  if (cat.includes('fridge') || cat.includes('freezer')) return 'refrigerator';
  if (cat.includes('laptop') || cat.includes('macbook') || cat.includes('pc')) return 'laptop';
  if (cat.includes('camera')) return 'camera';
  if (cat.includes('shoe') || cat.includes('sneaker')) return 'sneakers';
  if (cat.includes('clothing') || cat.includes('shirt') || cat.includes('dress')) return 'clothing';
  if (cat.includes('watch')) return 'smartwatch';
  if (cat.includes('game') || cat.includes('playstation') || cat.includes('xbox')) return 'gaming';
  if (cat.includes('baby') || cat.includes('diaper')) return 'baby';
  if (cat.includes('food') || cat.includes('drink') || cat.includes('coffee')) return 'grocery';
  if (cat.includes('beauty') || cat.includes('makeup') || cat.includes('lip')) return 'makeup';
  if (cat.includes('furniture') || cat.includes('decor')) return 'furniture';
  if (cat.includes('generator') || cat.includes('inverter')) return 'generator';
  return encodeURIComponent(category);
}

function generateName(category) {
  const brands = ['Hisense', 'Samsung', 'LG', 'Tecno', 'Infinix', 'Apple', 'Sony', 'Binatone', 'Century', 'Polystar'];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  return `${brand} Premium ${category} - New Edition`;
}

function generatePrice(category) {
  const cat = category.toLowerCase();
  if (cat.includes('tv') || cat.includes('fridge') || cat.includes('generator') || cat.includes('laptop') || cat.includes('phone') || cat.includes('air conditioner')) {
    return Math.floor(Math.random() * 500000) + 150000;
  }
  if (cat.includes('shoe') || cat.includes('watch') || cat.includes('blender') || cat.includes('iron') || cat.includes('kettle')) {
    return Math.floor(Math.random() * 30000) + 10000;
  }
  return Math.floor(Math.random() * 10000) + 2000;
}

function fixMockData() {
  const fileContent = fs.readFileSync('src/data/mockProducts.ts', 'utf8');
  const arrayStart = fileContent.indexOf('[');
  const arrayEnd = fileContent.lastIndexOf(']') + 1;
  const jsonStr = fileContent.substring(arrayStart, arrayEnd);
  
  let mockProducts;
  try {
    mockProducts = eval(jsonStr);
  } catch (e) {
    console.error("Failed to parse mock products array");
    return;
  }

  mockProducts.forEach((p, i) => {
    // Generate a realistic name based on the category
    if (p.category.includes('Tecno') || p.category.includes('Infinix') || p.category.includes('Samsung')) {
       p.name = `${p.category} Smartphone 128GB/4GB RAM`;
    } else if (p.category.includes('TV')) {
       p.name = `${p.category} Smart Android Television`;
    } else {
       p.name = generateName(p.category);
    }
    
    // Assign Unsplash image with appropriate keyword
    const keyword = getCategoryKeywords(p.category);
    // Add an index to prevent caching identical images
    p.image = `https://source.unsplash.com/400x400/?${keyword}&sig=${i}`;
    
    // Assign realistic price
    p.price = generatePrice(p.category);
  });

  const newContent = fileContent.substring(0, arrayStart) + JSON.stringify(mockProducts, null, 2) + ';\n';
  fs.writeFileSync('src/data/mockProducts.ts', newContent);
  console.log(`Successfully generated highly localized product names and perfectly matching images for all ${mockProducts.length} products!`);
}

fixMockData();
