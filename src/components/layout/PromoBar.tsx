'use client';

import styles from './PromoBar.module.css';

const PROMOS = [
  '🔥 Awoof of the Month — Up to 80% OFF selected items!',
  '🚚 Free delivery on orders over ₦10,000',
  '💳 Buy Now, Pay Later with FlexPay — 0% interest',
  '📦 Same-day delivery available in Lagos, Abuja & Port Harcourt',
  '⚡ Flash Sales every day at 12PM & 6PM — Don\'t miss out!',
];

export default function PromoBar() {
  return (
    <div className={styles.promoBar}>
      {/* Scrolling promo text */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          {[...PROMOS, ...PROMOS].map((promo, i) => (
            <span key={i} className={styles.promoItem}>
              {promo}
              <span className={styles.separator}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Right side: Live badge + phone */}
      <div className={styles.promoRight}>
        <span className={styles.liveBadge}>
          <span className={styles.liveDot} />
          LIVE NOW
        </span>
        <a href="tel:07006000000" className={styles.phoneLink}>
          📞 Call for Deals: <strong>0700-600-0000</strong>
        </a>
      </div>
    </div>
  );
}
