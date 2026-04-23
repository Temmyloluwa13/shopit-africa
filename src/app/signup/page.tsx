'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../login/Auth.module.css';
import signupStyles from './Signup.module.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4
    : 3;

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#EF4444', '#F59E0B', '#3B82F6', '#22C55E'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Brand panel */}
      <div className={styles.brandPanel}>
        <a href="/" className={styles.brandLogo}>
          <span className={styles.logoIcon}>🛍</span>
          <span>Shopit<span className={styles.logoAccent}> Africa</span></span>
        </a>
        <h2 className={styles.brandHeadline}>
          Join Millions of<br />Shoppers Across Africa
        </h2>
        <p className={styles.brandSub}>
          Create your free account today and enjoy exclusive deals, fast delivery, and a curated selection from top African vendors.
        </p>
        <ul className={signupStyles.perks}>
          <li><span>✅</span> Free account, no hidden fees</li>
          <li><span>✅</span> Track orders in real-time</li>
          <li><span>✅</span> Exclusive member discounts</li>
          <li><span>✅</span> Save favourites & wishlists</li>
          <li><span>✅</span> Secure checkout & buyer protection</li>
        </ul>
        <div className={styles.brandPattern} aria-hidden="true" />
      </div>

      {/* Form panel */}
      <div className={styles.formPanel}>
        <div className={styles.formCard}>
          <h1 className={styles.formTitle}>Create your account</h1>
          <p className={styles.formSubtitle}>It takes less than a minute to get started</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="signup-name" className={styles.label}>Full name</label>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                placeholder="Amara Okonkwo"
                value={name}
                onChange={e => setName(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="signup-email" className={styles.label}>Email address</label>
              <input
                id="signup-email"
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
              <label htmlFor="signup-password" className={styles.label}>Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="signup-password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
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
              {password.length > 0 && (
                <div className={signupStyles.strengthMeter}>
                  <div className={signupStyles.strengthBars}>
                    {[1,2,3,4].map(i => (
                      <div
                        key={i}
                        className={signupStyles.strengthBar}
                        style={{ background: i <= strength ? strengthColor[strength] : 'var(--border)' }}
                      />
                    ))}
                  </div>
                  <span className={signupStyles.strengthLabel} style={{ color: strengthColor[strength] }}>
                    {strengthLabel[strength]}
                  </span>
                </div>
              )}
            </div>

            <label className={signupStyles.checkRow}>
              <input
                id="terms-agree"
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className={signupStyles.checkbox}
              />
              <span>
                I agree to the{' '}
                <a href="/terms" className={styles.primaryLink}>Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className={styles.primaryLink}>Privacy Policy</a>
              </span>
            </label>

            <button
              id="signup-submit"
              type="submit"
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={loading || !agreed}
            >
              {loading ? <span className={styles.spinner} /> : 'Create Account'}
            </button>
          </form>

          <div className={styles.divider}><span>or sign up with</span></div>

          <div className={styles.socialRow}>
            <button id="google-signup" className={styles.socialBtn}>
              <svg viewBox="0 0 48 48" width="20" height="20">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.4 1.2 8.7 3.2l6.5-6.5C35.2 2.7 29.9 0 24 0 14.9 0 7.1 5.4 3.3 13.3l7.7 6C12.9 13.2 18 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.8-2.2 5.1-4.6 6.7l7.3 5.7c4.3-4 6.7-9.9 6.7-16.4z"/>
                <path fill="#FBBC05" d="M11 28.3c-.6-1.7-.9-3.5-.9-5.3 0-1.8.3-3.6.9-5.3l-7.7-6C1.2 15 0 19.4 0 24s1.2 9 3.3 12.3l7.7-6z"/>
                <path fill="#34A853" d="M24 48c6 0 11-2 14.7-5.3l-7.3-5.7c-2 1.3-4.5 2-7.4 2-6 0-11.1-3.7-12.9-9L3.3 36.3C7.1 44.6 14.9 48 24 48z"/>
              </svg>
              Google
            </button>
            <button id="facebook-signup" className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.03 4.388 11.031 10.125 11.927v-8.437H7.077v-3.49h3.048V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.104 24 18.103 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <p className={styles.switchLink}>
            Already have an account?{' '}
            <Link href="/login" className={styles.primaryLink}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
