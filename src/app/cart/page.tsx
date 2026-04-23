'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Cart.module.css';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  qty: number;
  vendor: string;
}

const INITIAL_CART: CartItem[] = [
  {
    id: '1',
    name: 'Luxury Wireless Over-Ear Headphones, Soft Gold Accent',
    price: 45000,
    image: '/images/headphones.png',
    category: 'Electronics',
    qty: 1,
    vendor: 'AudioLux Africa',
  },
  {
    id: '2',
    name: 'Premium Vibrant Orange & Charcoal Sneakers',
    price: 32500,
    image: '/images/sneaker.png',
    category: 'Fashion',
    qty: 2,
    vendor: 'StreetKix NG',
  },
];

const DELIVERY_FEE = 2500;
const PROMO_CODES: Record<string, number> = { 'SHOPIT10': 10, 'AFRICA20': 20 };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(item => item.id !== id));

  const subtotal    = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount    = appliedPromo ? Math.round(subtotal * (PROMO_CODES[appliedPromo] / 100)) : 0;
  const total       = subtotal - discount + (items.length ? DELIVERY_FEE : 0);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code.');
      setAppliedPromo(null);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <a href="/">Home</a><span>/</span><span>Cart</span>
          </nav>

          <h1 className={styles.pageTitle}>
            Shopping Cart
            <span className={styles.itemCount}>{items.reduce((s, i) => s + i.qty, 0)} items</span>
          </h1>

          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <span className={styles.emptyIcon}>🛒</span>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven&apos;t added anything yet.</p>
              <Link href="/products" className="btn btn-primary">Browse Products</Link>
            </div>
          ) : (
            <div className={styles.layout}>
              {/* ── Item list ── */}
              <div className={styles.itemList}>
                {items.map(item => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemDetails}>
                      <span className={styles.itemCategory}>{item.category}</span>
                      <Link href={`/product/${item.id}`} className={styles.itemName}>{item.name}</Link>
                      <span className={styles.itemVendor}>by {item.vendor}</span>
                      <div className={styles.itemFooter}>
                        {/* Quantity */}
                        <div className={styles.qtyControl}>
                          <button
                            id={`qty-dec-${item.id}`}
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            aria-label="Decrease"
                          >−</button>
                          <span>{item.qty}</span>
                          <button
                            id={`qty-inc-${item.id}`}
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label="Increase"
                          >+</button>
                        </div>
                        <span className={styles.itemPrice}>
                          ₦{(item.price * item.qty).toLocaleString()}
                        </span>
                        <button
                          id={`remove-${item.id}`}
                          className={styles.removeBtn}
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className={styles.cartActions}>
                  <Link href="/products" className="btn btn-outline">← Continue Shopping</Link>
                </div>
              </div>

              {/* ── Summary ── */}
              <div className={styles.summary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>

                <div className={styles.summaryRows}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Delivery fee</span>
                    <span>₦{DELIVERY_FEE.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                      <span>Promo ({appliedPromo})</span>
                      <span>−₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Promo code */}
                <div className={styles.promoSection}>
                  <div className={styles.promoInput}>
                    <input
                      id="promo-code"
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      className={styles.promoField}
                    />
                    <button id="apply-promo" className="btn btn-outline" onClick={applyPromo}>Apply</button>
                  </div>
                  {promoError && <p className={styles.promoError}>{promoError}</p>}
                  {appliedPromo && (
                    <p className={styles.promoSuccess}>
                      ✅ {PROMO_CODES[appliedPromo]}% off applied!
                    </p>
                  )}
                  <p className={styles.promoHint}>Try <strong>SHOPIT10</strong> or <strong>AFRICA20</strong></p>
                </div>

                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span className={styles.totalAmount}>₦{total.toLocaleString()}</span>
                </div>

                <Link id="checkout-btn" href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
                  Proceed to Checkout →
                </Link>

                <div className={styles.secureBadge}>
                  🔒 Secured by SSL encryption
                </div>

                {/* Payment methods */}
                <div className={styles.paymentMethods}>
                  <span className={styles.payBadge}>Paystack</span>
                  <span className={styles.payBadge}>Flutterwave</span>
                  <span className={styles.payBadge}>Bank Transfer</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
