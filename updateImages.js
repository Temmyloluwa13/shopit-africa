const fs = require('fs');

async function updateImages() {
  const content = fs.readFileSync('src/data/mockProducts.ts', 'utf8');
  const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  const products = eval(jsonStr);

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  console.log(`Found ${uniqueCategories.length} unique categories.`);

  const imageMap = {};
  
  // Create chunks of 10 requests at a time to avoid slamming the API
  for (let i = 0; i < uniqueCategories.length; i += 10) {
    const chunk = uniqueCategories.slice(i, i + 10);
    console.log(`Processing batch ${Math.floor(i/10) + 1} of ${Math.ceil(uniqueCategories.length/10)}...`);
    
    await Promise.all(chunk.map(async (cat) => {
      try {
        const query = encodeURIComponent(cat + " product");
        const res = await fetch(`https://unsplash.com/napi/search/photos?query=${query}&per_page=1`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          imageMap[cat] = data.results[0].urls.regular;
        } else {
          imageMap[cat] = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'; // generic fallback
        }
      } catch (err) {
        console.error(`Failed to fetch for ${cat}:`, err.message);
        imageMap[cat] = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80';
      }
    }));
    
    // Delay between chunks to prevent 429 Too Many Requests
    await new Promise(r => setTimeout(r, 1500));
  }

  // Assign new images
  products.forEach(p => {
    if (imageMap[p.category]) {
      p.image = imageMap[p.category];
    }
  });

  const newContent = content.substring(0, content.indexOf('[')) + JSON.stringify(products, null, 2) + ';\n';
  fs.writeFileSync('src/data/mockProducts.ts', newContent);
  console.log('Successfully updated all product images!');
}

updateImages();
