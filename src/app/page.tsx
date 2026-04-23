'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryMenu from '@/components/ui/CategoryMenu';
import HeroSlideshow from '@/components/ui/HeroSlideshow';
import DealShortcuts from '@/components/ui/DealShortcuts';
import FlashSales from '@/components/ui/FlashSales';
import ProductCard, { Product } from '@/components/ui/ProductCard';
import styles from './page.module.css';



import { MOCK_PRODUCTS } from '@/data/mockProducts';

const FEATURED_PRODUCTS: Product[] = MOCK_PRODUCTS.slice(4, 12);

export default function Home() {

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* ── Hero & Category Section ── */}
        <section className={`container ${styles.heroSectionWrapper}`}>
          <CategoryMenu />

          <div className={styles.heroBanner}>
            <HeroSlideshow />
            <div className={styles.heroContent}>
              <h1 className="animate-fade-in">
                The Premium <br />
                <span>African-Tech</span> <br />
                Marketplace
              </h1>
              <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Discover high-quality electronics, fashion, and lifestyle items.
                Secure payments, rapid continent-wide delivery.
              </p>
              <div className={`${styles.heroBtns} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <a href="/products" className="btn btn-primary">Shop Deals</a>
                <a href="/vendor/register" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                  Become a Vendor
                </a>
              </div>
            </div>
          </div>

          {/* ── Right sidebar widgets (Jumia-style) ── */}
          <div className={styles.heroWidgets}>
            {/* Call to order */}
            <a href="tel:07006000000" className={styles.widget}>
              <span className={styles.widgetIcon}>📞</span>
              <div>
                <p className={styles.widgetTitle}>Call to Order</p>
                <p className={styles.widgetSub}>0700-600-0000</p>
                <p className={styles.widgetMeta}>Mon–Sun • 8am–10pm</p>
              </div>
            </a>

            {/* Sell on Shopit */}
            <a href="/vendor/register" className={styles.widget}>
              <span className={styles.widgetIcon}>🏪</span>
              <div>
                <p className={styles.widgetTitle}>Sell on Shopit</p>
                <p className={styles.widgetSub}>Start earning today</p>
                <p className={styles.widgetMeta}>Free to register →</p>
              </div>
            </a>

            {/* Vendor Force CTA */}
            <div className={`${styles.widget} ${styles.vendorForce}`}>
              <div className={styles.vendorForceHeader}>
                <span>⚡</span>
                <span className={styles.vendorForceLogo}>Shopit<strong>FORCE</strong></span>
              </div>
              <p className={styles.vendorForceSub}>Become a delivery partner. Earn ₦5,000+ daily.</p>
              <a href="/vendor/force" className={styles.vendorForceBtn}>JOIN NOW →</a>
            </div>
          </div>
        </section>

        <DealShortcuts />

        {/* ── Shop by Category ── */}
        <section className={`container ${styles.section}`}>
          <div className={styles.sectionHeader}>
            <h2>Shop by Category</h2>
            <a href="/categories" className={styles.viewAll}>View All →</a>
          </div>
          <div className={styles.categoryGrid}>
            {[
              { emoji: '📱', label: 'Electronics',   href: '/products?category=Electronics' },
              { emoji: '👕', label: 'Fashion',       href: '/products?category=Fashion' },
              { emoji: '🛋️', label: 'Home & Kitchen',href: '/products?category=Home+%26+Kitchen' },
              { emoji: '💄', label: 'Beauty',        href: '/products?category=Beauty' },
              { emoji: '👟', label: 'Footwear',      href: '/products?category=Footwear' },
              { emoji: '🍎', label: 'Groceries',     href: '/products?category=Groceries' },
            ].map(cat => (
              <a key={cat.label} href={cat.href} className={styles.categoryCard}>
                <span>{cat.emoji}</span>
                <p>{cat.label}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── Flash Sales ── */}
        <section className={`container ${styles.section}`}>
          <FlashSales />
        </section>

        {/* ── Featured Products ── */}
        <section className={`container ${styles.section}`}>
          <div className={styles.sectionHeader}>
            <h2>Featured Products</h2>
            <a href="/products" className={styles.viewAll}>View All →</a>
          </div>
          <div className={styles.productGrid}>
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── Vendor CTA Banner ── */}
        <section className={`container ${styles.section}`}>
          <div className={styles.vendorBanner}>
            <div className={styles.vendorBannerContent}>
              <h2>Start Selling on Shopit Africa</h2>
              <p>Join 8,000+ vendors and reach millions of shoppers across Africa. Free registration, low commission.</p>
              <div className={styles.heroBtns}>
                <a href="/vendor/register" className="btn btn-primary">Register Your Store</a>
                <a href="/vendor/login" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}>Vendor Login</a>
              </div>
            </div>
            <div className={styles.vendorBannerEmoji} aria-hidden="true">🏪</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
