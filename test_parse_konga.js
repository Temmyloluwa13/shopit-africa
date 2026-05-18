const fs = require('fs');

async function testParse() {
  const html = fs.readFileSync('konga.html', 'utf8');
  // In Konga HTML, products usually look like:
  // <h3 class="name">Product Name</h3>
  // <div class="price">₦10,000</div>
  // Let's dump all product names
  
  // Konga uses class names that might be minified or slightly different.
  // We can look for strings matching typical product structures.
  // Alternatively, let's look for "item" or "product"
  
  const regex = /<h3[^>]*>([^<]+)<\/h3>/gi;
  let match;
  let count = 0;
  while ((match = regex.exec(html)) !== null && count < 20) {
    console.log(match[1]);
    count++;
  }
}

testParse();
