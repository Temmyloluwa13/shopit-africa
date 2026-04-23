import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './Register.module.css';

export default function VendorRegisterPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.leftPanel}>
            <div className={styles.leftContent}>
              <h1>Become a Seller on <br/><span>Shopit Africa</span></h1>
              <p>Join thousands of vendors expanding their businesses across the continent. Reach millions of active buyers securely and effortlessly.</p>
              
              <ul className={styles.benefitsList}>
                <li>
                  <span className={styles.icon}>💰</span>
                  <div>
                    <h3>Massive Audience Reach</h3>
                    <p>Access our millions of daily active users ready to buy.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>⚡</span>
                  <div>
                    <h3>Fast Premium Shipping</h3>
                    <p>Leverage our rapid continent-wide logistics network.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.icon}>🛡️</span>
                  <div>
                    <h3>Secure & Reliable Payouts</h3>
                    <p>Get paid on time, every time, with zero hidden fees.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.formCard}>
              <h2>Create Vendor Account</h2>
              <p className={styles.subtitle}>Setup your store profile to get started.</p>

              <form action="/api/vendor/register" method="POST" className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="storeName">Store Name</label>
                  <input type="text" id="storeName" name="storeName" placeholder="e.g., Nexus Gadgets" required />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="vendor@example.com" required />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="category">Primary Category</label>
                  <select id="category" name="category" required>
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics & Tech</option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="home">Home & Appliances</option>
                    <option value="beauty">Health & Beauty</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="••••••••" required />
                </div>

                <Link href="/vendor/dashboard" className={`btn btn-primary ${styles.submitBtn}`}>
                  Register and Continue
                </Link>

                <p className={styles.loginLink}>
                  Already have a seller account? <Link href="/vendor/login">Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
