'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { Product } from '@/components/ui/ProductCard';
import styles from './Categories.module.css';

const ALL_CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📺',
    color: '#3B82F6',
    bg: '#EFF6FF',
    count: 2840,
    subcats: ['Smartphones', 'Laptops', 'TVs', 'Audio', 'Cameras', 'Accessories'],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '👗',
    color: '#EC4899',
    bg: '#FDF2F8',
    count: 5120,
    subcats: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Bags', 'Jewellery', 'Watches'],
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    icon: '🛋️',
    color: '#F59E0B',
    bg: '#FFFBEB',
    count: 1930,
    subcats: ['Furniture', 'Kitchen', 'Bedding', 'Storage', 'Lighting', 'Decor'],
  },
  {
    id: 'beauty',
    name: 'Health & Beauty',
    icon: '💄',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    count: 3210,
    subcats: ['Skincare', 'Hair Care', 'Makeup', 'Fragrances', 'Personal Care', 'Vitamins'],
  },
  {
    id: 'computing',
    name: 'Computing',
    icon: '💻',
    color: '#10B981',
    bg: '#ECFDF5',
    count: 980,
    subcats: ['Laptops', 'Desktops', 'Monitors', 'Printers', 'Networking', 'Storage'],
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    icon: '⚽',
    color: '#FF6A00',
    bg: '#FFF5F0',
    count: 1450,
    subcats: ['Exercise', 'Football', 'Basketball', 'Cycling', 'Swimming', 'Camping'],
  },
  {
    id: 'groceries',
    name: 'Groceries',
    icon: '🍎',
    color: '#22C55E',
    bg: '#F0FDF4',
    count: 4200,
    subcats: ['Staples', 'Beverages', 'Snacks', 'Dairy', 'Frozen Foods', 'Baby Food'],
  },
  {
    id: 'baby',
    name: 'Baby Products',
    icon: '👶',
    color: '#F472B6',
    bg: '#FFF1F2',
    count: 880,
    subcats: ['Feeding', 'Diapers', 'Clothing', 'Toys', 'Safety', 'Nursery'],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    color: '#6366F1',
    bg: '#EEF2FF',
    count: 650,
    subcats: ['Consoles', 'Games', 'Controllers', 'Headsets', 'PC Gaming', 'Mobile Gaming'],
  },
];

// A small selection of products per category for the quick preview
const SAMPLE_PRODUCTS: Record<string, Product[]> = {
  electronics: [
    { id: '1', name: 'Luxury Wireless Headphones', price: 45000, originalPrice: 68000, category: 'Electronics', image: '/images/headphones.png', isFlashSale: true, itemsLeft: 8, rating: 4.8 },
    { id: '3', name: 'Smart Home Security Camera 4K', price: 28000, originalPrice: 38000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=400&q=80', itemsLeft: 6, rating: 4.4 },
  ],
  fashion: [
    { id: '2', name: 'Premium Orange & Charcoal Sneakers', price: 32500, originalPrice: 45000, category: 'Fashion', image: '/images/sneaker.png', isFlashSale: true, itemsLeft: 15, rating: 4.6 },
    { id: '4', name: 'African Print Summer Dress', price: 15000, originalPrice: 22000, category: 'Fashion', image: 'https://images.unsplash.com/photo-1515347619362-e64e9a0ce6c3?w=400&q=80', itemsLeft: 3, rating: 4.9 },
  ],
};

export default function CategoriesPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = selected ? ALL_CATEGORIES.find(c => c.id === selected) : null;
  const products = selected ? (SAMPLE_PRODUCTS[selected] ?? []) : [];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          {/* Page header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Browse Categories</h1>
            <p className={styles.pageSubtitle}>Explore our curated selection across every category</p>
          </div>

          {/* Category grid */}
          <div className={styles.catGrid}>
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                className={`${styles.catCard} ${selected === cat.id ? styles.catCardActive : ''}`}
                style={{
                  '--cat-color': cat.color,
                  '--cat-bg': cat.bg,
                } as React.CSSProperties}
                onClick={() => setSelected(selected === cat.id ? null : cat.id)}
              >
                <div className={styles.catIconBox}>
                  <span className={styles.catIcon}>{cat.icon}</span>
                </div>
                <p className={styles.catName}>{cat.name}</p>
                <p className={styles.catCount}>{cat.count.toLocaleString()} items</p>
              </button>
            ))}
          </div>

          {/* Expanded category panel */}
          {active && (
            <div className={styles.expandedPanel} style={{ '--cat-color': active.color, '--cat-bg': active.bg } as React.CSSProperties}>
              <div className={styles.expandedHeader}>
                <div className={styles.expandedTitle}>
                  <span className={styles.expandedIcon}>{active.icon}</span>
                  <div>
                    <h2>{active.name}</h2>
                    <p>{active.count.toLocaleString()} products</p>
                  </div>
                </div>
                <a href={`/products?category=${encodeURIComponent(active.name)}`} className="btn btn-primary" id="view-all-cat">
                  View All →
                </a>
              </div>

              {/* Subcategories */}
              <div className={styles.subcatRow}>
                {active.subcats.map(s => (
                  <a
                    key={s}
                    href={`/products?category=${encodeURIComponent(s)}`}
                    className={styles.subcatChip}
                  >
                    {s}
                  </a>
                ))}
              </div>

              {/* Sample products */}
              {products.length > 0 && (
                <div className={styles.sampleProducts}>
                  <p className={styles.sampleTitle}>Popular in {active.name}</p>
                  <div className={styles.sampleGrid}>
                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
