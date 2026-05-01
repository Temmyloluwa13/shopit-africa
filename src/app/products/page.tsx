'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { Product } from '@/components/ui/ProductCard';
import styles from './Products.module.css';

// ── Mock data ────────────────────────────────────────────────────────────────
import { MOCK_PRODUCTS } from '@/data/mockProducts';

const ALL_PRODUCTS: Product[] = MOCK_PRODUCTS;

import { CATEGORIES as MAIN_CATEGORIES } from '@/components/ui/CategoryMenu';

const SIDEBAR_CATEGORIES = ['All', ...MAIN_CATEGORIES.filter(c => c.id !== 'official-store' && c.id !== 'other').map(c => c.label)];

const getSubcategories = (label: string) => {
  const main = MAIN_CATEGORIES.find(c => c.label === label);
  if (!main || !main.subcategories) return [];
  return main.subcategories.flatMap(g => g.items);
};
const SORT_OPTIONS = [
  { label: 'Newest',        value: 'newest' },
  { label: 'Price: Low–High', value: 'price_asc' },
  { label: 'Price: High–Low', value: 'price_desc' },
  { label: 'Flash Sales',   value: 'flash' },
];

export default function ProductsPage() {
  const [search, setSearch]         = useState('');
  const [category, setCategory]     = useState('All');
  const [sort, setSort]             = useState('newest');
  const [viewMode, setViewMode]     = useState<'grid' | 'list'>('grid');
  const [priceMax, setPriceMax]     = useState(100000);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (search.trim())
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    if (category !== 'All') {
      if (SIDEBAR_CATEGORIES.includes(category)) {
        const subcats = getSubcategories(category);
        result = result.filter(p => subcats.includes(p.category));
      } else {
        result = result.filter(p => p.category === category);
      }
    }

    result = result.filter(p => p.price <= priceMax);

    switch (sort) {
      case 'price_asc':  result.sort((a, b) => a.price - b.price);   break;
      case 'price_desc': result.sort((a, b) => b.price - a.price);   break;
      case 'flash':      result = result.filter(p => p.isFlashSale); break;
    }

    return result;
  }, [search, category, sort, priceMax]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── Page Header ── */}
        <div className={styles.pageHeader}>
          <div className="container">
            <nav className={styles.breadcrumb}>
              <a href="/">Home</a>
              <span>/</span>
              <span>Products</span>
            </nav>
            <h1 className={styles.pageTitle}>
              {category === 'All' ? 'All Products' : category}
            </h1>
            <p className={styles.pageSubtitle}>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* ── Search bar ── */}
        <div className={`container ${styles.searchRow}`}>
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              id="product-search"
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch('')} aria-label="Clear search">✕</button>
            )}
          </div>
          <button className={`btn btn-outline ${styles.filterToggle}`} onClick={() => setSidebarOpen(o => !o)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filters
          </button>
        </div>

        {/* ── Body: sidebar + grid ── */}
        <div className={`container ${styles.body}`}>
          {/* Sidebar */}
          <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Categories</h3>
              <ul className={styles.categoryList}>
                {SIDEBAR_CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`${styles.categoryBtn} ${category === cat ? styles.categoryBtnActive : ''}`}
                      onClick={() => { setCategory(cat); setSidebarOpen(false); }}
                    >
                      {cat}
                      <span className={styles.catCount}>
                        {cat === 'All' 
                          ? ALL_PRODUCTS.length 
                          : ALL_PRODUCTS.filter(p => getSubcategories(cat).includes(p.category)).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Max Price</h3>
              <div className={styles.priceRange}>
                <input
                  id="price-range"
                  type="range"
                  min={1000}
                  max={100000}
                  step={500}
                  value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  className={styles.rangeSlider}
                />
                <div className={styles.priceLabels}>
                  <span>₦1,000</span>
                  <span className={styles.priceValue}>₦{priceMax.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Deals</h3>
              <button
                className={`${styles.categoryBtn} ${sort === 'flash' ? styles.categoryBtnActive : ''}`}
                onClick={() => setSort(sort === 'flash' ? 'newest' : 'flash')}
              >
                ⚡ Flash Sales only
                <span className={styles.catCount}>{ALL_PRODUCTS.filter(p => p.isFlashSale).length}</span>
              </button>
            </div>

            <button className={`btn btn-outline ${styles.resetBtn}`} onClick={() => { setCategory('All'); setSort('newest'); setPriceMax(100000); setSearch(''); }}>
              Reset Filters
            </button>
          </aside>

          {/* Product area */}
          <div className={styles.productArea}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.sortRow}>
                <label htmlFor="sort-select" className={styles.sortLabel}>Sort by:</label>
                <select id="sort-select" value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className={styles.viewToggle}>
                <button
                  id="view-grid"
                  aria-label="Grid view"
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                  </svg>
                </button>
                <button
                  id="view-list"
                  aria-label="List view"
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Active filter chips */}
            {(category !== 'All' || search || priceMax < 100000) && (
              <div className={styles.filterChips}>
                {category !== 'All' && (
                  <span className={styles.chip}>{category} <button onClick={() => setCategory('All')}>✕</button></span>
                )}
                {search && (
                  <span className={styles.chip}>"{search}" <button onClick={() => setSearch('')}>✕</button></span>
                )}
                {priceMax < 100000 && (
                  <span className={styles.chip}>Under ₦{priceMax.toLocaleString()} <button onClick={() => setPriceMax(100000)}>✕</button></span>
                )}
              </div>
            )}

            {/* Grid / List */}
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>🔍</span>
                <p>No products match your filters.</p>
                <button className="btn btn-primary" onClick={() => { setCategory('All'); setSearch(''); setPriceMax(100000); }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? styles.productGrid : styles.productList}>
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
