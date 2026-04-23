"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.col}>
          <h3>Shopit Africa</h3>
          <p>
            The premium African-tech marketplace. Discover quality products, 
            fast delivery, and secure payments across the continent.
          </p>
        </div>
        
        <div className={styles.col}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Support</Link></li>
            <li><Link href="/faq">Help Center</Link></li>
            <li><Link href="/track-order">Track Your Order</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3>Categories</h3>
          <ul>
            <li><Link href="/category/electronics">Electronics</Link></li>
            <li><Link href="/category/fashion">Fashion</Link></li>
            <li><Link href="/category/home-kitchen">Home & Kitchen</Link></li>
            <li><Link href="/category/beauty">Beauty & Health</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest deals and offers.</p>
          <form className={styles.subscribe} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Shopit Africa. All rights reserved.</p>
      </div>
    </footer>
  );
}
