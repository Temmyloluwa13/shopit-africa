const fs = require('fs');

async function fetchJumia(query) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const res = await fetch('https://www.jumia.com.ng/catalog/?q=' + encodeURIComponent(query), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    clearTimeout(timeoutId);

    if (res.status === 403) {
      console.error(`Blocked (403) for ${query}! Jumia's firewall rejected the request.`);
      return [];
    }

    const data = await res.text();
    const products = [];
    const regex = /<article class="prd _fb col c-prd".*?href="(.*?)".*?data-src="(.*?)".*?<h3 class="name">(.*?)<\/h3>.*?<div class="prc">(.*?)<\/div>/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      const priceStr = match[4].replace(/[^\d]/g, '');
      const price = parseInt(priceStr, 10);
      if (price && !isNaN(price)) {
        products.push({
          name: match[3],
          image: match[2],
          price: price
        });
      }
    }
    return products;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`Error fetching ${query}: ${error.message}`);
    return [];
  }
}

async function scrapeAndUpdate() {
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

  const categoriesToUpdate = [...new Set(mockProducts.map(p => p.category))];
  
  if (categoriesToUpdate.length === 0) {
    console.log("No categories found!");
    return;
  }

  console.log(`Found ${categoriesToUpdate.length} unique categories to fetch products for.`);
  console.log(`Using anti-Cloudflare headers to bypass the 403 firewall...`);
  
  const jumiaDataMap = {}; 
  
  for (let i = 0; i < categoriesToUpdate.length; i += 3) {
    const chunk = categoriesToUpdate.slice(i, i + 3);
    console.log(`Scraping Jumia for batch ${Math.floor(i/3) + 1} of ${Math.ceil(categoriesToUpdate.length/3)}...`);
    
    await Promise.all(chunk.map(async (cat) => {
      const jumiaProducts = await fetchJumia(cat);
      jumiaDataMap[cat] = jumiaProducts;
    }));
    
    // 3 seconds delay
    await new Promise(r => setTimeout(r, 3000));
  }
  
  let successCount = 0;
  const catIndexMap = {};
  
  mockProducts.forEach(p => {
    const cat = p.category;
    const jProducts = jumiaDataMap[cat];
    if (jProducts && jProducts.length > 0) {
      if (catIndexMap[cat] === undefined) catIndexMap[cat] = 0;
      
      const idx = catIndexMap[cat] % jProducts.length;
      const jProd = jProducts[idx];
      
      p.name = jProd.name;
      p.image = jProd.image;
      p.price = jProd.price;
      
      catIndexMap[cat]++;
      successCount++;
    }
  });

  console.log(`\nSuccessfully updated ${successCount} products with fresh authentic Jumia data!`);

  // Write back safely
  const newContent = fileContent.substring(0, arrayStart) + JSON.stringify(mockProducts, null, 2) + ';\n';
  fs.writeFileSync('src/data/mockProducts.ts', newContent);
  console.log('Saved to src/data/mockProducts.ts');
}

scrapeAndUpdate();
