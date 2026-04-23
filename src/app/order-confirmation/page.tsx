'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './OrderConfirmation.module.css';

const ORDER_NUMBER = 'SHA-' + Math.floor(100000 + Math.random() * 900000);

const STEPS = [
  { icon: '✅', label: 'Order Placed',    done: true  },
  { icon: '📦', label: 'Processing',      done: false },
  { icon: '🚚', label: 'Shipped',         done: false },
  { icon: '🏠', label: 'Delivered',       done: false },
];

export default function OrderConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={`container ${styles.wrapper}`}>
          {/* Success banner */}
          <div className={styles.successBanner}>
            <div className={styles.checkCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="40" height="40">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 className={styles.title}>Order Confirmed! 🎉</h1>
            <p className={styles.subtitle}>
              Thank you for shopping with Shopit Africa. Your order has been received and is being processed.
            </p>
            <div className={styles.orderNumber}>
              Order <strong>#{ORDER_NUMBER}</strong>
            </div>
          </div>

          {/* Delivery tracking */}
          <div className={`card ${styles.card}`}>
            <h2 className={styles.cardTitle}>Delivery Status</h2>
            <div className={styles.tracker}>
              {STEPS.map((step, i) => (
                <div key={i} className={styles.trackStep}>
                  <div className={`${styles.trackDot} ${step.done ? styles.trackDotDone : ''}`}>
                    {step.icon}
                  </div>
                  <p className={`${styles.trackLabel} ${step.done ? styles.trackLabelDone : ''}`}>
                    {step.label}
                  </p>
                  {i < STEPS.length - 1 && (
                    <div className={`${styles.trackLine} ${step.done ? styles.trackLineDone : ''}`} />
                  )}
                </div>
              ))}
            </div>
            <p className={styles.etaText}>
              📅 Estimated delivery: <strong>April 14–17, 2026</strong>
            </p>
          </div>

          {/* Order details */}
          <div className={`card ${styles.card}`}>
            <h2 className={styles.cardTitle}>Order Details</h2>
            <div className={styles.detailGrid}>
              <div className={styles.detailBlock}>
                <h3 className={styles.detailLabel}>Shipping to</h3>
                <p>Amara Okonkwo</p>
                <p>12 Adeyemi Crescent, VI</p>
                <p>Lagos State, Nigeria</p>
              </div>
              <div className={styles.detailBlock}>
                <h3 className={styles.detailLabel}>Payment</h3>
                <p>Paystack</p>
                <p className={styles.paid}>✅ Paid</p>
              </div>
              <div className={styles.detailBlock}>
                <h3 className={styles.detailLabel}>Items ordered</h3>
                <div className={styles.itemRow}>
                  <img src="/images/headphones.png" alt="Headphones" className={styles.itemThumb} />
                  <div>
                    <p>Luxury Wireless Headphones</p>
                    <p className={styles.itemMeta}>Qty 1 · ₦45,000</p>
                  </div>
                </div>
                <div className={styles.itemRow}>
                  <img src="/images/sneaker.png" alt="Sneakers" className={styles.itemThumb} />
                  <div>
                    <p>Orange & Charcoal Sneakers</p>
                    <p className={styles.itemMeta}>Qty 2 · ₦65,000</p>
                  </div>
                </div>
              </div>
              <div className={styles.detailBlock}>
                <h3 className={styles.detailLabel}>Summary</h3>
                <div className={styles.summaryLine}><span>Subtotal</span><span>₦110,000</span></div>
                <div className={styles.summaryLine}><span>Delivery</span><span>₦2,500</span></div>
                <div className={`${styles.summaryLine} ${styles.totalLine}`}><span>Total</span><span>₦112,500</span></div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className={styles.ctaRow}>
            <Link id="track-order-btn" href="/account/orders" className="btn btn-primary">
              Track Order
            </Link>
            <Link id="continue-shopping-btn" href="/products" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>

          <p className={styles.emailNote}>
            📧 A confirmation email has been sent to <strong>amara@example.com</strong>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
