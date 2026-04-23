const fs = require('fs');

const categoryMenuCode = fs.readFileSync('c:/Users/shopit-africa/src/components/ui/CategoryMenu.tsx', 'utf-8');

// Regex to find all items: [ '...', '...' ] arrays
const itemsRegex = /items:\s*\[([\s\S]*?)\]/g;
let match;
const allSubcategories = new Set();
while ((match = itemsRegex.exec(categoryMenuCode)) !== null) {
    const listStr = match[1];
    // extract individual strings
    const strRegex = /'([^']+)'|"([^"]+)"/g;
    let sMatch;
    while ((sMatch = strRegex.exec(listStr)) !== null) {
        const val = sMatch[1] || sMatch[2];
        if (val) allSubcategories.add(val);
    }
}

// Ensure we have some fallbacks just in case
if (allSubcategories.size === 0) {
    ['Blenders', 'Smartphones', 'Televisions'].forEach(s => allSubcategories.add(s));
}

const images = [
    'https://images.unsplash.com/photo-1585237832873-1996f01da1fd?w=600&q=80',
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80',
    'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&q=80',
    'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&q=80',
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80',
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80'
];

let idCounter = 1;
const products = [];

const prefixes = ["Premium", "Ultra", "Classic", "Smart", "Digital", "Advanced", "Elite", "Compact", "Heavy Duty", "Portable", "Pro", "Max"];
const brands = ["Samsung", "Apple", "LG", "Hisense", "Sony", "Philips", "Tefal", "Logitech", "HP", "Dell", "Nexus", "Haier", "Binatone", "Panasonic", "TCL", "Oraimo", "Kenwood", "Nike", "Adidas", "Zara"];

for (const subCat of allSubcategories) {
    for (let i = 0; i < 800; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const modelNum = Math.floor(Math.random() * 9000) + 1000;
        const name = brand + " " + prefix + " " + subCat + " X" + modelNum;

        const isFlashSale = Math.random() > 0.85;
        let price = 5000 + Math.random() * 450000;
        price = Math.round(price / 100) * 100;

        let originalPrice = undefined;
        if (Math.random() > 0.5) {
            originalPrice = Math.round(price * (1 + 0.1 + Math.random() * 0.4) / 100) * 100;
        }

        const rating = Number((3.0 + Math.random() * 2.0).toFixed(1));
        const itemsLeft = isFlashSale ? Math.floor(Math.random() * 40) + 1 : undefined;
        const img = images[Math.floor(Math.random() * images.length)];

        products.push({
            id: 'prod_' + idCounter++,
            name,
            price,
            ...(originalPrice && { originalPrice }),
            category: subCat.toLowerCase().replace(/ /g, '-'),
            image: img,
            rating,
            ...(isFlashSale && { isFlashSale }),
            ...(itemsLeft && { itemsLeft })
        });
    }
}

let outStr = "import { Product } from '@/components/ui/ProductCard';\n\n";
outStr += "export const MOCK_PRODUCTS: Product[] = [\n";
outStr += products.map(p => "  " + JSON.stringify(p)).join(",\n");
outStr += "\n];\n";

fs.writeFileSync('c:/Users/shopit-africa/src/data/mockProducts.ts', outStr);
console.log('Successfully generated ' + products.length + ' products, ~800 for each of ' + allSubcategories.size + ' subcategories.');
