import Link from 'next/link';
import styles from './Dashboard.module.css';

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Shopit<span>Vendor</span></h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/vendor/dashboard" className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.icon}>📊</span>
            Dashboard
          </Link>
          <Link href="/vendor/dashboard/products" className={styles.navItem}>
            <span className={styles.icon}>📦</span>
            Products
          </Link>
          <Link href="/vendor/dashboard/products/new" className={styles.navItem}>
            <span className={styles.icon}>➕</span>
            Add Product
          </Link>
          <Link href="/vendor/dashboard/orders" className={styles.navItem}>
            <span className={styles.icon}>🛍️</span>
            Orders
          </Link>
          <Link href="/vendor/dashboard/analytics" className={styles.navItem}>
            <span className={styles.icon}>📈</span>
            Analytics
          </Link>
          <Link href="/vendor/dashboard/settings" className={styles.navItem}>
            <span className={styles.icon}>⚙️</span>
            Settings
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn}>
            <span className={styles.icon}>🚪</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}>Overview</div>
          <div className={styles.topbarActions}>
            <Link href="/" className={styles.visitStoreBtn}>
              Visit Store
            </Link>
            <div className={styles.vendorProfile}>
              <div className={styles.avatar}>V</div>
              <span>Nexus Gadgets</span>
            </div>
          </div>
        </header>
        
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
