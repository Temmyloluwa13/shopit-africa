const fs = require('fs');
const content = fs.readFileSync('src/components/ui/CategoryMenu.tsx', 'utf8');
const catMatch = content.substring(content.indexOf('export const CATEGORIES = ['), content.indexOf('];', content.indexOf('export const CATEGORIES = [')) + 2);
const CATEGORIES = eval(catMatch.replace('export const CATEGORIES =', ''));
const allSubcats = CATEGORIES.flatMap(c => c.subcategories ? c.subcategories.flatMap(g => g.items) : []);
console.log('Total subcats:', allSubcats.length);

let mockContent = fs.readFileSync('src/data/mockProducts.ts', 'utf8');
let productsStr = mockContent.substring(mockContent.indexOf('['), mockContent.lastIndexOf(']') + 1);
let products = eval(productsStr);

products.forEach((p, i) => {
  p.category = allSubcats[i % allSubcats.length];
});

const newMockContent = mockContent.substring(0, mockContent.indexOf('[')) + JSON.stringify(products, null, 2) + ';\n';
fs.writeFileSync('src/data/mockProducts.ts', newMockContent);
console.log('Fixed mockProducts.ts');

