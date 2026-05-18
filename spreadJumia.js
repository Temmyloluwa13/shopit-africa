const fs = require('fs');

function spreadJumiaProducts() {
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

  // Extract the valid Jumia products we successfully fetched earlier
  const validJumiaProducts = mockProducts.filter(p => !p.image.includes('unsplash.com') && p.image.includes('jumia.is'));
  
  console.log(`Found ${validJumiaProducts.length} authentic Jumia products.`);

  if (validJumiaProducts.length === 0) {
    console.error("No Jumia products found. Cannot proceed.");
    return;
  }

  // Shuffle the valid products so we can distribute them randomly
  const shuffledJumia = [...validJumiaProducts].sort(() => 0.5 - Math.random());

  let updateCount = 0;

  // Replace any Unsplash product with a randomly selected Jumia product
  mockProducts.forEach((p, index) => {
    if (p.image.includes('unsplash.com')) {
      // Pick a Jumia product (looping through our 66 valid ones)
      const replacement = shuffledJumia[updateCount % shuffledJumia.length];
      
      p.name = replacement.name;
      p.image = replacement.image;
      
      // Slightly tweak the price so it's not identical everywhere
      const variance = Math.floor(Math.random() * 5000) - 2500;
      p.price = Math.max(1000, replacement.price + variance);
      
      // Keep the original category so the sidebar filters still work!
      
      updateCount++;
    }
  });

  const newContent = fileContent.substring(0, arrayStart) + JSON.stringify(mockProducts, null, 2) + ';\n';
  fs.writeFileSync('src/data/mockProducts.ts', newContent);
  console.log(`Successfully distributed Jumia products to the remaining ${updateCount} slots!`);
}

spreadJumiaProducts();
