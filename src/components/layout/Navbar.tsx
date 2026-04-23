import Link from 'next/link';
import PromoBar from './PromoBar';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <>
      <PromoBar />
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            Shopit<span>Africa</span>
          </Link>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search products, brands and categories..."
              className={styles.searchInput}
            />
            <button className={styles.searchBtn}>Search</button>
          </div>

          <div className={styles.navLinks}>
            {/* Account Dropdown */}
            <div className={styles.dropdown}>
              <button className={`${styles.navLink} ${styles.dropdownToggle}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Account</span>
                <svg className={styles.chevronIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <Link href="/login" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', color: 'white', fontWeight: 600 }}>
                    Sign In
                  </Link>
                </div>
                <ul className={styles.dropdownList}>
                  <li>
                    <Link href="/account">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/wishlist">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      Wishlist
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Help Dropdown */}
            <div className={styles.dropdown}>
              <button className={`${styles.navLink} ${styles.dropdownToggle}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>Help</span>
                <svg className={styles.chevronIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className={styles.dropdownMenu} style={{ minWidth: '240px' }}>
                <ul className={styles.dropdownList}>
                  <li><Link href="/help">Help Center</Link></li>
                  <li><Link href="/help/place-order">Place an order</Link></li>
                  <li><Link href="/help/payment">Payment options</Link></li>
                  <li><Link href="/help/track-order">Track an order</Link></li>
                  <li><Link href="/help/cancel-order">Cancel an order</Link></li>
                  <li><Link href="/help/returns">Returns &amp; Refunds</Link></li>
                  <li><Link href="/help/cookies">Cookie Preferences</Link></li>
                </ul>
                <div className={styles.dropdownFooter}>
                  <button className={`${styles.actionBtn} ${styles.liveChatBtn}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      <path d="M9 10h.01"></path><path d="M12 10h.01"></path><path d="M15 10h.01"></path>
                    </svg>
                    Live Chat
                  </button>
                  <button className={`${styles.actionBtn} ${styles.whatsappBtn}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Cart with badge */}
            <Link href="/cart" className={`${styles.navLink} ${styles.cartLink}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Cart
              <span className={styles.cartBadge}>3</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
