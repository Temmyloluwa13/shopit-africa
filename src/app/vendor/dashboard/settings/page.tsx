'use client';

import { useState } from 'react';
import styles from './Settings.module.css';

export default function VendorSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState({ orders: true, promotions: false, reviews: true, lowStock: true });
  const [activeTab, setActiveTab] = useState<'store' | 'payment' | 'notifications' | 'security'>('store');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage your store profile, payments and preferences</p>
      </div>

      <div className={styles.layout}>
        {/* Tab sidebar */}
        <nav className={styles.tabNav}>
          {([
            { id: 'store',         icon: '🏪', label: 'Store Profile' },
            { id: 'payment',       icon: '💳', label: 'Payment' },
            { id: 'notifications', icon: '🔔', label: 'Notifications' },
            { id: 'security',      icon: '🔒', label: 'Security' },
          ] as const).map(tab => (
            <button
              key={tab.id}
              id={`settings-tab-${tab.id}`}
              className={`${styles.tabItem} ${activeTab === tab.id ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div className={`card ${styles.panel}`}>

          {/* ── Store Profile ── */}
          {activeTab === 'store' && (
            <div className={styles.form}>
              <h2 className={styles.formTitle}>Store Profile</h2>

              <div className={styles.avatarRow}>
                <div className={styles.storeAvatar}>N</div>
                <div>
                  <p className={styles.avatarName}>Nexus Gadgets</p>
                  <button className={styles.changeAvatarBtn}>Change Logo</button>
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Store Name</label>
                  <input className={styles.input} defaultValue="Nexus Gadgets" id="store-name" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Store Category</label>
                  <select className={styles.input} id="store-category">
                    <option>Electronics</option><option>Fashion</option><option>Home & Kitchen</option>
                    <option>Beauty</option><option>Sports</option>
                  </select>
                </div>
                <div className={`${styles.field} ${styles.fullCol}`}>
                  <label className={styles.label}>Store Description</label>
                  <textarea className={styles.textarea} rows={3} defaultValue="Premium electronics and gadgets sourced from top global brands. Same-day dispatch in Lagos." id="store-desc" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Contact Email</label>
                  <input className={styles.input} type="email" defaultValue="nexus@shopit.africa" id="store-email" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Phone Number</label>
                  <input className={styles.input} type="tel" defaultValue="+234 801 234 5678" id="store-phone" />
                </div>
                <div className={`${styles.field} ${styles.fullCol}`}>
                  <label className={styles.label}>Store Address</label>
                  <input className={styles.input} defaultValue="12 Computer Village, Ikeja, Lagos State" id="store-addr" />
                </div>
              </div>
            </div>
          )}

          {/* ── Payment ── */}
          {activeTab === 'payment' && (
            <div className={styles.form}>
              <h2 className={styles.formTitle}>Payment Settings</h2>
              <p className={styles.formDesc}>Your earnings are paid out within 48 hours after delivery confirmation.</p>

              <div className={styles.payoutCard}>
                <span className={styles.payoutIcon}>🏦</span>
                <div>
                  <p className={styles.payoutTitle}>Current Payout Account</p>
                  <p className={styles.payoutBank}>Zenith Bank · **** **** 4721</p>
                  <p className={styles.payoutName}>Nexus Gadgets Ltd</p>
                </div>
                <button className={styles.changeBtn}>Change</button>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Bank Name</label>
                  <select className={styles.input} id="bank-name">
                    <option>Zenith Bank</option><option>GTBank</option><option>Access Bank</option>
                    <option>First Bank</option><option>UBA</option><option>Opay</option><option>Palmpay</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Account Number</label>
                  <input className={styles.input} placeholder="0123456789" maxLength={10} id="acct-num" />
                </div>
                <div className={`${styles.field} ${styles.fullCol}`}>
                  <label className={styles.label}>Account Name</label>
                  <input className={styles.input} placeholder="Verified account name" id="acct-name" readOnly />
                </div>
              </div>

              <div className={styles.infoBox}>
                <span>💡</span>
                <p>Payout schedule: every Wednesday & Friday for confirmed deliveries.</p>
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {activeTab === 'notifications' && (
            <div className={styles.form}>
              <h2 className={styles.formTitle}>Notification Preferences</h2>
              <p className={styles.formDesc}>Control which notifications you receive via email and SMS.</p>

              {([
                { key: 'orders' as const,     label: 'New Orders',      desc: 'Get notified when a customer places an order.' },
                { key: 'promotions' as const, label: 'Promotions',      desc: 'Flash sale invites and discount campaign alerts.' },
                { key: 'reviews' as const,    label: 'Customer Reviews', desc: 'When a buyer leaves a review on your product.' },
                { key: 'lowStock' as const,   label: 'Low Stock Alerts', desc: 'When a product drops below 5 units in stock.' },
              ]).map(pref => (
                <div key={pref.key} className={styles.toggleRow}>
                  <div>
                    <p className={styles.toggleLabel}>{pref.label}</p>
                    <p className={styles.toggleDesc}>{pref.desc}</p>
                  </div>
                  <button
                    id={`toggle-${pref.key}`}
                    className={`${styles.toggle} ${notif[pref.key] ? styles.toggleOn : ''}`}
                    onClick={() => setNotif(n => ({ ...n, [pref.key]: !n[pref.key] }))}
                    aria-checked={notif[pref.key]}
                    role="switch"
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Security ── */}
          {activeTab === 'security' && (
            <div className={styles.form}>
              <h2 className={styles.formTitle}>Security</h2>

              <div className={styles.fieldGrid}>
                <div className={`${styles.field} ${styles.fullCol}`}>
                  <label className={styles.label}>Current Password</label>
                  <input className={styles.input} type="password" placeholder="Enter current password" id="cur-pwd" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>New Password</label>
                  <input className={styles.input} type="password" placeholder="Min 8 characters" id="new-pwd" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Confirm Password</label>
                  <input className={styles.input} type="password" placeholder="Repeat new password" id="conf-pwd" />
                </div>
              </div>

              <div className={styles.securityCards}>
                <div className={styles.secCard}>
                  <span>📱</span>
                  <div>
                    <p className={styles.secCardTitle}>Two-Factor Authentication</p>
                    <p className={styles.secCardDesc}>Add an extra layer of security to your account</p>
                  </div>
                  <button className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}>Enable</button>
                </div>
                <div className={styles.secCard}>
                  <span>🔓</span>
                  <div>
                    <p className={styles.secCardTitle}>Active Sessions</p>
                    <p className={styles.secCardDesc}>1 active session — Chrome on Windows</p>
                  </div>
                  <button className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem', color: '#EF4444', borderColor: '#EF4444' }}>Sign Out All</button>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className={styles.formFooter}>
            {saved && <span className={styles.savedMsg}>✅ Changes saved successfully!</span>}
            <button id="settings-save" className="btn btn-primary" onClick={handleSave}>
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
