'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard, { Product } from '@/components/ui/ProductCard';
import styles from './ProductDetail.module.css';

// ── Mock data (same source as listing, later replaced by API/DB) ─────────────
const ALL_PRODUCTS: (Product & {
  description: string;
  rating: number;
  reviewCount: number;
  vendor: string;
  stock: number;
  originalPrice?: number;
  specs?: Record<string, string>;
  images: string[];
})[] = [
  {
    id: '1',
    name: 'Luxury Wireless Over-Ear Headphones, Soft Gold Accent',
    price: 45000,
    originalPrice: 68000,
    category: 'Electronics',
    image: '/images/headphones.png',
    images: ['/images/headphones.png',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    ],
    isFlashSale: true,
    rating: 4.8,
    reviewCount: 214,
    vendor: 'AudioLux Africa',
    stock: 8,
    description: 'Experience premium sound quality with these luxury wireless over-ear headphones featuring a stunning soft gold accent. Engineered for audiophiles who demand the very best, they deliver rich bass, crystal-clear mids, and sparkling highs with zero distortion. Enjoy up to 40 hours of playback on a single charge.',
    specs: { 'Driver Size': '40mm', 'Frequency Response': '20Hz–20kHz', 'Battery': '40 hours', 'Connectivity': 'Bluetooth 5.2', 'Weight': '285g' },
  },
  {
    id: '2',
    name: 'Premium Vibrant Orange & Charcoal Sneakers',
    price: 32500,
    originalPrice: 45000,
    category: 'Fashion',
    image: '/images/sneaker.png',
    images: ['/images/sneaker.png',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    ],
    isFlashSale: true,
    rating: 4.6,
    reviewCount: 87,
    vendor: 'StreetKix NG',
    stock: 23,
    description: 'Turn heads with these bold, vibrant orange and charcoal sneakers. Crafted for the streets of Lagos to the runways of Nairobi, they blend comfort technology with African street-style culture. Lightweight EVA midsole, breathable knit upper, and premium outsole grip.',
    specs: { 'Material': 'Knit upper, rubber sole', 'Sizes': 'EU 38–47', 'Closure': 'Lace-up', 'Care': 'Spot clean only' },
  },
  {
    id: '3',
    name: 'Smart Home Security Camera 4K',
    price: 28000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=800&q=80'],
    rating: 4.4,
    reviewCount: 59,
    vendor: 'SafeHome Tech',
    stock: 15,
    description: 'Keep your home secure with 4K ultra-HD streaming, night vision, motion alerts, and two-way audio. Works with Alexa and Google Home. IP66 weatherproof for indoor/outdoor use.',
    specs: { 'Resolution': '4K 8MP', 'Night Vision': '30m', 'Storage': 'Cloud / microSD', 'Power': 'PoE / 12V DC' },
  },
  {
    id: '4',
    name: 'African Print Summer Dress – Limited Edition',
    price: 15000,
    originalPrice: 22000,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1515347619362-e64e9a0ce6c3?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1515347619362-e64e9a0ce6c3?w=800&q=80'],
    isFlashSale: true,
    rating: 4.9,
    reviewCount: 142,
    vendor: 'Afrique Styles',
    stock: 5,
    description: 'Celebrate African heritage with this vibrant, limited-edition wax-print summer dress. Designed by Accra-based artisans, every piece is unique. A-line cut, fully lined, available in standard and plus sizes.',
    specs: { 'Fabric': '100% Wax Cotton', 'Care': 'Hand wash cold', 'Sizes': 'XS–3XL', 'Origin': 'Made in Ghana' },
  },
];

const REVIEWS = [
  { id: 'r1', user: 'Chidi O.',     rating: 5, date: 'Mar 2026', text: 'Absolutely premium product. Great packaging and fast delivery!' },
  { id: 'r2', user: 'Amara K.',     rating: 5, date: 'Mar 2026', text: 'Exceeded my expectations. Worth every kobo.' },
  { id: 'r3', user: 'Seun T.',      rating: 4, date: 'Feb 2026', text: 'Very good quality. Minor cosmetic issue but seller resolved quickly.' },
];

function StarRating({ rating, small }: { rating: number; small?: boolean }) {
  return (
    <div className={`${styles.stars} ${small ? styles.starsSmall : ''}`} aria-label={`${rating} out of 5`}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 24 24" className={i <= Math.round(rating) ? styles.starFilled : styles.starEmpty}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = ALL_PRODUCTS.find(p => p.id === id);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity]       = useState(1);
  const [activeTab, setActiveTab]     = useState<'description' | 'specs' | 'reviews'>('description');
  const [wishlisted, setWishlisted]   = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const relatedProducts = ALL_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <a href="/">Home</a><span>/</span>
            <a href="/products">Products</a><span>/</span>
            <a href={`/products?category=${product.category}`}>{product.category}</a><span>/</span>
            <span>{product.name.slice(0, 40)}{product.name.length > 40 ? '…' : ''}</span>
          </nav>

          {/* ── Product hero ── */}
          <div className={styles.productHero}>
            {/* Image gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImageWrapper}>
                {product.isFlashSale && <span className={styles.flashTag}>⚡ Flash Sale</span>}
                {discount && <span className={styles.discountTag}>-{discount}%</span>}
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className={styles.mainImage}
                />
                <button
                  id="wishlist-btn"
                  className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
                  onClick={() => setWishlisted(w => !w)}
                  aria-label="Add to wishlist"
                >
                  <svg viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              {product.images.length > 1 && (
                <div className={styles.thumbnails}>
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      id={`thumb-${i}`}
                      className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                      onClick={() => setActiveImage(i)}
                      aria-label={`Image ${i + 1}`}
                    >
                      <img src={img} alt={`View ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className={styles.info}>
              <span className={styles.categoryBadge}>{product.category}</span>
              <h1 className={styles.productName}>{product.name}</h1>

              <div className={styles.ratingRow}>
                <StarRating rating={product.rating} />
                <span className={styles.ratingScore}>{product.rating}</span>
                <span className={styles.ratingCount}>({product.reviewCount} reviews)</span>
              </div>

              <div className={styles.vendorRow}>
                Sold by <a href="#" className={styles.vendorLink}>{product.vendor}</a>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.price}>₦{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className={styles.originalPrice}>₦{product.originalPrice.toLocaleString()}</span>
                    <span className={styles.discountBadge}>Save {discount}%</span>
                  </>
                )}
              </div>

              {/* Stock indicator */}
              <div className={`${styles.stockBar} ${product.stock <= 5 ? styles.lowStock : ''}`}>
                <span className={styles.stockDot} />
                {product.stock <= 5
                  ? `Only ${product.stock} left in stock – order soon!`
                  : `${product.stock} in stock`}
              </div>

              {/* Quantity + Add to Cart */}
              <div className={styles.actions}>
                <div className={styles.qtyControl}>
                  <button id="qty-dec" onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button id="qty-inc" onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
                </div>
                <button
                  id="add-to-cart-btn"
                  className={`btn btn-primary ${styles.addToCartBtn} ${addedToCart ? styles.addedToCart : ''}`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? '✓ Added!' : '🛒 Add to Cart'}
                </button>
              </div>

              <button id="buy-now-btn" className={`btn btn-secondary ${styles.buyNowBtn}`}>
                Buy Now
              </button>

              {/* Delivery promise */}
              <div className={styles.promises}>
                <div className={styles.promise}>
                  <span>🚚</span><p>Fast delivery across Africa</p>
                </div>
                <div className={styles.promise}>
                  <span>🔒</span><p>Secure & encrypted payment</p>
                </div>
                <div className={styles.promise}>
                  <span>↩️</span><p>7-day easy returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Tab section ── */}
          <div className={styles.tabSection}>
            <div className={styles.tabBar}>
              {(['description', 'specs', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'description' ? 'Description' : tab === 'specs' ? 'Specifications' : `Reviews (${REVIEWS.length})`}
                </button>
              ))}
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <p className={styles.descriptionText}>{product.description}</p>
              )}

              {activeTab === 'specs' && product.specs && (
                <table className={styles.specsTable}>
                  <tbody>
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k}>
                        <th>{k}</th>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'reviews' && (
                <div className={styles.reviewsPanel}>
                  <div className={styles.reviewSummary}>
                    <div className={styles.bigRating}>{product.rating}</div>
                    <StarRating rating={product.rating} />
                    <p>{product.reviewCount} verified reviews</p>
                  </div>
                  <div className={styles.reviewList}>
                    {REVIEWS.map(r => (
                      <div key={r.id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                          <div className={styles.reviewAvatar}>{r.user[0]}</div>
                          <div>
                            <p className={styles.reviewUser}>{r.user}</p>
                            <StarRating rating={r.rating} small />
                          </div>
                          <span className={styles.reviewDate}>{r.date}</span>
                        </div>
                        <p className={styles.reviewText}>{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Related products ── */}
          {relatedProducts.length > 0 && (
            <section className={styles.related}>
              <h2 className={styles.relatedTitle}>You May Also Like</h2>
              <div className={styles.relatedGrid}>
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
