"use client";

import styles from './CategoryMenu.module.css';
import { useState } from 'react';

// Mock data structured directly from the provided image
export const CATEGORIES = [
  { id: 'official-store', icon: '⭐', label: 'Official Store', subcategories: null },
  { 
    id: 'appliances', 
    icon: '🥘', 
    label: 'Appliances', 
    subcategories: [
      {
        title: 'SMALL APPLIANCES',
        items: [
          'Blenders', 'Deep Fryers', 'Juicers', 'Air Fryers', 'Rice Cookers', 
          'Toasters & Ovens', 'Microwaves', 'Bundles', 'Vacuum Cleaners', 
          'Kettles', 'Yam Pounders', 'Irons', 'Electric Cookware', 
          'Electric Drink Mixers', 'Food Processors', 'Coffee Makers', 
          'Electric Pressure Cookers'
        ]
      },
      {
        title: 'LARGE APPLIANCES',
        items: [
          'Washing Machines', 'Fridges', 'Freezers', 'Air Conditioners', 
          'Heaters', 'Fans', 'Air Purifiers', 'Water Dispensers', 
          'Generators & Inverters'
        ]
      },
      {
        title: 'HOME APPLIANCES',
        items: [] // In reference image, nothing is under it explicitly but the title is there
      },
      {
        title: 'TOP BRANDS',
        items: [
          'Nexus', 'Hisense', 'Polystar', 'TCL'
        ]
      }
    ]
  },
  { 
    id: 'phones-tablets', 
    icon: '📱', 
    label: 'Phones & Tablets',
    subcategories: [
      {
        title: 'MOBILE PHONES',
        items: [
          'Smartphones', 'Android Phones', 'iPhones', 'Basic Phones', 
          'Refurbished Phones', 'Rugged Phones', 'Cordless Telephones', 'Dual Sim Phones'
        ]
      },
      {
        title: 'TABLETS',
        items: [
          'iPads', 'Android Tablets', 'Educational Tablets', 
          'Tablet Accessories', 'Amazon Fire Tablets', 'Microsoft Tablets'
        ]
      },
      {
        title: 'MOBILE ACCESSORIES',
        items: [
          'Accessory Kits', 'Adapters', 'Batteries', 'Battery Chargers', 
          'Bluetooth Headsets', 'Cables', 'Car Accessories', 'Chargers', 
          'Earphones & Headsets', 'MicroSD Cards', 'Screen Protectors', 
          'Selfie Sticks & Tripods', 'Smart Watches', 'Power Banks', 'Phone Camera Lenses'
        ]
      },
      {
        title: 'TOP SMARTPHONES',
        items: [
          'iPhone 15 & 15 Pro Max', 'Samsung Galaxy S24 & S24 Ultra', 'Tecno Spark 20 & 20 Pro', 
          'Itel S23 & S23 Plus', 'Infinix Smart 8', 'Xiaomi Redmi 13c', 'Infinix Hot 40i', 
          'Tecno Pop 8', 'Itel A70'
        ]
      },
      {
        title: 'TOP PHONE BRANDS',
        items: [
          'Samsung', 'Apple', 'Xiaomi', 'Itel', 'Tecno'
        ]
      }
    ]
  },
  {
    id: 'health-beauty',
    icon: '💄',
    label: 'Health & Beauty',
    subcategories: [
      {
        title: 'MAKE UP',
        items: [
          'Concealers & Color Correctors',
          'Foundation',
          'Powder',
          'Lipstick',
          'Eyeliner & Kajal',
          'Mascara',
        ]
      },
      {
        title: 'PERSONAL CARE',
        items: [
          'Skin Care',
          'Sunscreens & Tanning Products',
          'Contraceptives & Lubricants',
          'Piercing & Tattoo Supplies',
          'Deodorants & Antiperspirants',
          'Lip Care',
        ]
      },
      {
        title: 'FRAGRANCES',
        items: [
          "Women's",
          "Men's",
        ]
      },
      {
        title: 'HAIR CARE',
        items: [
          'Hair Cutting Tools',
          'Shampoo & Conditioner',
          'Wigs & Accessories',
        ]
      },
      {
        title: 'ORAL CARE',
        items: [
          'Teeth Whitening',
          'Toothpaste',
        ]
      },
      {
        title: 'HEALTH CARE',
        items: [
          'First Aid',
          'Medical Supplies & Equipment',
          'Alternative Medicine',
          'Feminine Care',
          'Diabetes Care',
        ]
      },
      {
        title: 'VITAMINS & DIETARY SUPPLEMENTS',
        items: [
          'Vitamins & Minerals',
          'Supplements',
          'Multi & Prenatal Vitamins',
        ]
      },
    ]
  },
  {
    id: 'home-office',
    icon: '🏠',
    label: 'Home & Office',
    subcategories: [
      {
        title: 'HOME & KITCHEN',
        items: [
          'Bath',
          'Bedding',
          'Home Decor',
          'Home Furniture',
          'Vacuums & Floor Care',
          'Wall Art',
          'Cookware',
          'Bakeware',
          'Small Appliances',
          'Cutlery & Knife Accessories',
        ]
      },
      {
        title: 'OFFICE PRODUCTS',
        items: [
          'Office & School Supplies',
          'Office Furniture & Lighting',
          'Packaging Materials',
        ]
      },
      {
        title: 'HOME & OFFICE FURNITURE',
        items: [
          'Kitchen & Dining',
          'Lighting',
          'Stationery',
          'Storage & Organization',
        ]
      },
      {
        title: 'OUTDOOR & GARDEN',
        items: [
          'Generator',
        ]
      },
    ]
  },
  { 
    id: 'electronics', 
    icon: '📺', 
    label: 'Electronics', 
    subcategories: [
      {
        title: 'TELEVISION & VIDEO',
        items: [
          'Televisions',
          'Smart TVs',
          'LED & LCD TVs',
          'QLED & OLED TVs',
          'Curved TV',
          'LG TV',
          'Hisense TV',
          'Samsung TV',
          'Smart TV 32 Inches',
          'Smart TV 43 Inches',
          'Smart TV 55 Inches',
          'TV Accessories',
          'DVD Players & Recorders',
        ]
      },
      {
        title: 'CAMERAS & PHOTOS',
        items: [
          'Digital Cameras',
          'Projectors',
          'Video Surveillance',
          'CCTV Cameras',
          'Compact Cameras',
          'SLR Digital Cameras',
          'Professional Video Cameras',
          'Sport & Action Cameras',
          'Instant Cameras',
          'Drones with Camera',
          'Nikon',
        ]
      },
      {
        title: 'HOME AUDIO',
        items: [
          'Home Theatre Systems',
          'Receivers & Amplifiers',
          'Sound Bars',
          'LG Home Theater System',
          'Hisense Sound Bar',
          'Bluetooth Speakers',
          'Subwoofers',
          'LG',
          'JBL',
        ]
      },
      {
        title: 'GENERATORS & PORTABLE POWER',
        items: [
          'Generators',
          'Power Inverters',
          'Solar & Wind Power',
          'Stabilizers',
          'Batteries',
          'Lithium Battery',
        ]
      },
    ]
  },
  {
    id: 'fashion',
    icon: '👕',
    label: 'Fashion',
    subcategories: [
      {
        title: "WOMEN'S FASHION",
        items: [
          'Clothing',
          'Shoes',
          'Accessories',
          'Jewelry',
          'Handbags & Wallets',
          'Underwear & Sleepwear',
          'Maternity',
          'Dresses',
          'Traditional',
          'Beach & Swimwear',
          'Flats',
          'Women Costumes & Accessories',
        ]
      },
      {
        title: "KID'S FASHION",
        items: [
          "Boy's Fashion",
          "Girl's Fashion",
        ]
      },
      {
        title: "MEN'S FASHION",
        items: [
          'Clothing',
          'Shoes',
          'Accessories',
          'Underwear & Sleepwear',
          'Traditional & Cultural Wear',
          'T-Shirts',
          'Polo Shirts',
          'Trousers & Chinos',
          'Sneakers',
          'Jewelry',
          'Jerseys',
        ]
      },
      {
        title: 'ALL FASHION',
        items: [
          'Fabrics',
          'Luggage & Travel Gear',
          'Multi-Pack',
          'Traditional & Cultural Wear',
        ]
      },
      {
        title: 'WATCHES',
        items: [
          "Men's Watches",
          "Women's Watches",
        ]
      },
      {
        title: 'SUNGLASSES',
        items: [
          "Men's Sunglasses",
          "Women's Sunglasses",
        ]
      },
      {
        title: 'TOP BRANDS',
        items: [
          'Adidas',
          'DeFacto',
          'Nike',
        ]
      },
    ]
  },
  {
    id: 'supermarket',
    icon: '🍎',
    label: 'Supermarket',
    subcategories: [
      {
        title: 'FOOD CUPBOARD',
        items: [
          'Rice & Grains',
          'Pasta & Noodles',
          'Cooking Oil',
          'Canned & Packaged Foods',
          'Condiments & Sauces',
          'Baking Supplies',
          'Breakfast Cereals',
          'Spices & Seasonings',
        ]
      },
      {
        title: 'BEVERAGES',
        items: [
          'Water',
          'Soft Drinks',
          'Juices',
          'Tea',
          'Coffee',
          'Energy Drinks',
          'Malt Drinks',
        ]
      },
      {
        title: 'HOUSEHOLD SUPPLIES',
        items: [
          'Cleaning Supplies',
          'Laundry',
          'Air Fresheners',
          'Toilet Paper & Tissues',
          'Pest Control',
          'Dishwashing',
        ]
      },
      {
        title: 'BABY FOOD & FORMULA',
        items: [
          'Baby Cereals',
          'Baby Formula',
          'Baby Snacks',
        ]
      },
      {
        title: 'SNACKS & CONFECTIONERY',
        items: [
          'Biscuits & Cookies',
          'Chocolate',
          'Sweets & Candy',
          'Chips & Crisps',
          'Nuts & Seeds',
          'Dried Fruits',
        ]
      },
      {
        title: 'FROZEN FOOD',
        items: [
          'Frozen Chicken',
          'Frozen Fish',
          'Frozen Vegetables',
          'Ice Cream',
        ]
      },
    ]
  },
  {
    id: 'computing',
    icon: '💻',
    label: 'Computing',
    subcategories: [
      {
        title: 'COMPUTERS',
        items: [
          'Laptops',
          'Desktops',
          'MacBooks',
          'Chromebooks',
          'Refurbished Laptops',
          'Mini PCs',
        ]
      },
      {
        title: 'COMPUTER ACCESSORIES',
        items: [
          'Keyboards',
          'Mice',
          'Monitors',
          'Laptop Bags',
          'Webcams',
          'USB Hubs & Docks',
          'Laptop Stands',
          'Cooling Pads',
        ]
      },
      {
        title: 'DATA STORAGE',
        items: [
          'External Hard Drives',
          'USB Flash Drives',
          'Memory Cards',
          'Internal Hard Drives',
          'Solid State Drives (SSD)',
        ]
      },
      {
        title: 'PRINTERS & SCANNERS',
        items: [
          'Inkjet Printers',
          'Laser Printers',
          'All-in-One Printers',
          'Scanners',
          'Ink & Toner',
          '3D Printers',
        ]
      },
      {
        title: 'NETWORKING',
        items: [
          'Routers',
          'Wi-Fi Extenders',
          'Network Switches',
          'Modems',
          'Ethernet Cables',
        ]
      },
    ]
  },
  {
    id: 'baby-products',
    icon: '👶',
    label: 'Baby Products',
    subcategories: [
      {
        title: 'DIAPERING',
        items: [
          'Disposable Diapers',
          'Cloth Diapers',
          'Wipes',
          'Diaper Bags',
          'Diaper Rash Cream',
          'Changing Mats',
        ]
      },
      {
        title: 'FEEDING',
        items: [
          'Bottles & Nipples',
          'Breastfeeding',
          'High Chairs',
          'Bibs & Burp Cloths',
          'Sterilizers',
          'Breast Pumps',
        ]
      },
      {
        title: 'BABY GEAR',
        items: [
          'Strollers',
          'Car Seats',
          'Baby Carriers',
          'Baby Walkers',
          'Bouncers & Swings',
          'Playmats',
        ]
      },
      {
        title: 'NURSERY',
        items: [
          'Cribs & Beds',
          'Bedding Sets',
          'Baby Monitors',
          'Night Lights',
          'Mosquito Nets',
        ]
      },
    ]
  },
  {
    id: 'gaming',
    icon: '🎮',
    label: 'Gaming',
    subcategories: [
      {
        title: 'CONSOLES',
        items: [
          'PlayStation 5',
          'Xbox Series X/S',
          'Nintendo Switch',
          'Retro Consoles',
          'Console Bundles',
        ]
      },
      {
        title: 'GAMES',
        items: [
          'PS5 Games',
          'Xbox Games',
          'Nintendo Games',
          'PC Games',
          'Game Cards & Subscriptions',
        ]
      },
      {
        title: 'GAMING ACCESSORIES',
        items: [
          'Controllers & Gamepads',
          'Gaming Headsets',
          'Steering Wheels',
          'VR Headsets',
          'Gaming Chairs',
          'Charging Docks',
        ]
      },
      {
        title: 'PC GAMING',
        items: [
          'Gaming Laptops',
          'Gaming Monitors',
          'Gaming Keyboards',
          'Gaming Mice',
          'Graphics Cards',
        ]
      },
    ]
  },
  { id: 'other', icon: '💬', label: 'Other categories', subcategories: null },
];

export default function CategoryMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className={styles.menuContainer} onMouseLeave={() => setActiveCategory(null)}>
      {/* Sidebar List */}
      <div className={styles.sidebar}>
        <ul className={styles.categoryList}>
          {CATEGORIES.map((cat) => (
            <li 
              key={cat.id}
              className={`${styles.categoryItem} ${activeCategory === cat.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveCategory(cat.id)}
            >
              <span className={styles.icon}>{cat.icon}</span>
              <span className={styles.label}>{cat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mega Menu Flyout */}
      {activeCategory && CATEGORIES.find(c => c.id === activeCategory)?.subcategories && (
        <div className={styles.megaMenu}>
          <div className={styles.megaMenuGrid}>
            {CATEGORIES.find(c => c.id === activeCategory)!.subcategories!.map((group, index) => (
              <div key={index} className={styles.menuCategoryGroup}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <ul className={styles.groupList}>
                  {group.items.map((item, idx) => (
                    <li key={idx}>
                      <a href={`/products?category=${encodeURIComponent(item)}`} className={styles.groupItem}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
