'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Auth.module.css';

export default function LoginPage() {
  const [tab, setTab] = useState<'customer' | 'vendor'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // mock
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Left panel – branding */}
      <div className={styles.brandPanel}>
        <a href="/" className={styles.brandLogo}>
          <span className={styles.logoIcon}>🛍</span>
          <span>Shopit<span className={styles.logoAccent}> Africa</span></span>
        </a>
        <h2 className={styles.brandHeadline}>
          Africa's Premium<br />Multi-Vendor Marketplace
        </h2>
        <p className={styles.brandSub}>
          Shop from thousands of verified vendors across the continent. 
          Fast delivery, secure payments, quality guaranteed.
        </p>
        <div className={styles.brandStats}>
          <div className={styles.stat}><strong>50K+</strong><span>Products</span></div>
          <div className={styles.stat}><strong>8K+</strong><span>Vendors</span></div>
          <div className={styles.stat}><strong>2M+</strong><span>Shoppers</span></div>
        </div>
        <div className={styles.brandPattern} aria-hidden="true" />
      </div>

      {/* Right panel – form */}
      <div className={styles.formPanel}>
        <div className={styles.formCard}>
          <h1 className={styles.formTitle}>Welcome back</h1>
          <p className={styles.formSubtitle}>Sign in to your account to continue</p>

          {/* Tab switcher */}
          <div className={styles.tabRow}>
            <button
              id="tab-customer"
              className={`${styles.tabBtn} ${tab === 'customer' ? styles.tabBtnActive : ''}`}
              onClick={() => setTab('customer')}
            >
              Customer
            </button>
            <button
              id="tab-vendor"
              className={`${styles.tabBtn} ${tab === 'vendor' ? styles.tabBtnActive : ''}`}
              onClick={() => setTab('vendor')}
            >
              Vendor
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="login-email" className={styles.label}>Email address</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label htmlFor="login-password" className={styles.label}>Password</label>
                <a href="/forgot-password" className={styles.forgotLink}>Forgot password?</a>
              </div>
              <div className={styles.passwordWrapper}>
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner} /> : `Sign in as ${tab === 'customer' ? 'Customer' : 'Vendor'}`}
            </button>
          </form>

          <div className={styles.divider}><span>or continue with</span></div>

          <div className={styles.socialRow}>
            <button id="google-login" className={styles.socialBtn}>
              <svg viewBox="0 0 48 48" width="20" height="20">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.4 1.2 8.7 3.2l6.5-6.5C35.2 2.7 29.9 0 24 0 14.9 0 7.1 5.4 3.3 13.3l7.7 6C12.9 13.2 18 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.8-2.2 5.1-4.6 6.7l7.3 5.7c4.3-4 6.7-9.9 6.7-16.4z"/>
                <path fill="#FBBC05" d="M11 28.3c-.6-1.7-.9-3.5-.9-5.3 0-1.8.3-3.6.9-5.3l-7.7-6C1.2 15 0 19.4 0 24s1.2 9 3.3 12.3l7.7-6z"/>
                <path fill="#34A853" d="M24 48c6 0 11-2 14.7-5.3l-7.3-5.7c-2 1.3-4.5 2-7.4 2-6 0-11.1-3.7-12.9-9L3.3 36.3C7.1 44.6 14.9 48 24 48z"/>
              </svg>
              Google
            </button>
            <button id="facebook-login" className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.03 4.388 11.031 10.125 11.927v-8.437H7.077v-3.49h3.048V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.104 24 18.103 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <p className={styles.switchLink}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className={styles.primaryLink}>Create one →</Link>
          </p>
          {tab === 'vendor' && (
            <p className={styles.switchLink}>
              New vendor?{' '}
              <Link href="/vendor/register" className={styles.primaryLink}>Register your store →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
