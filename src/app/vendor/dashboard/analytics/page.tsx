'use client';

import { useState } from 'react';
import styles from './Analytics.module.css';

// ── Mock chart data ──────────────────────────────────────────────────────────
const MONTHLY_REVENUE = [
  { month: 'Oct', value: 420000, orders: 38 },
  { month: 'Nov', value: 580000, orders: 51 },
  { month: 'Dec', value: 890000, orders: 82 },
  { month: 'Jan', value: 640000, orders: 57 },
  { month: 'Feb', value: 720000, orders: 63 },
  { month: 'Mar', value: 810000, orders: 74 },
  { month: 'Apr', value: 540000, orders: 48 },
];

const TOP_PRODUCTS = [
  { name: 'Luxury Wireless Headphones', sales: 124, revenue: 5580000,  pct: 92 },
  { name: 'Orange Charcoal Sneakers',   sales: 87,  revenue: 2827500,  pct: 65 },
  { name: 'Smart Security Camera 4K',   sales: 63,  revenue: 1764000,  pct: 47 },
  { name: 'African Print Summer Dress', sales: 58,  revenue: 870000,   pct: 43 },
  { name: 'Solar Phone Charger',        sales: 44,  revenue: 858000,   pct: 33 },
];

const TRAFFIC_SOURCES = [
  { label: 'Organic Search', pct: 42, color: '#FF6A00' },
  { label: 'Direct',         pct: 26, color: '#3B82F6' },
  { label: 'Social Media',   pct: 18, color: '#8B5CF6' },
  { label: 'Referral',       pct: 9,  color: '#F59E0B' },
  { label: 'Email',          pct: 5,  color: '#22C55E' },
];

const RECENT_REVIEWS = [
  { customer: 'Amara O.', product: 'Luxury Headphones', rating: 5, text: 'Absolutely premium!', date: '10 Apr' },
  { customer: 'Chidi N.', product: 'Orange Sneakers',   rating: 4, text: 'Great quality, fast delivery.', date: '09 Apr' },
  { customer: 'Fatima H.', product: 'Security Camera', rating: 5, text: 'Easy setup, works perfectly.', date: '08 Apr' },
];

const MAX_REVENUE = Math.max(...MONTHLY_REVENUE.map(m => m.value));

type Period = '7d' | '30d' | '3m' | '1y';

export default function VendorAnalyticsPage() {
  const [period, setPeriod] = useState<Period>('30d');

  const STATS = [
    { label: 'Total Revenue',   value: '₦4,600,500', change: '+18.4%', up: true,  icon: '💰' },
    { label: 'Total Orders',    value: '413',         change: '+12.1%', up: true,  icon: '🛒' },
    { label: 'Avg Order Value', value: '₦11,140',     change: '-2.3%',  up: false, icon: '📊' },
    { label: 'Return Rate',     value: '1.8%',        change: '-0.5%',  up: true,  icon: '↩️' },
    { label: 'Store Views',     value: '28,450',      change: '+31.2%', up: true,  icon: '👁️' },
    { label: 'Conversion Rate', value: '3.2%',        change: '+0.8%',  up: true,  icon: '🎯' },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Analytics</h1>
          <p className={styles.pageSubtitle}>Track your store performance in real time</p>
        </div>
        <div className={styles.periodTabs}>
          {(['7d','30d','3m','1y'] as Period[]).map(p => (
            <button
              key={p}
              id={`period-${p}`}
              className={`${styles.periodTab} ${period === p ? styles.periodTabActive : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : p === '3m' ? '3 Months' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI stat cards */}
      <div className={styles.statsGrid}>
        {STATS.map(stat => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={`${styles.statChange} ${stat.up ? styles.up : styles.down}`}>
                {stat.change}
              </span>
            </div>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className={styles.chartsRow}>
        {/* Revenue bar chart */}
        <div className={`card ${styles.chartCard}`}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Monthly Revenue</h2>
            <span className={styles.chartSubtitle}>Last 7 months</span>
          </div>
          <div className={styles.barChart}>
            {MONTHLY_REVENUE.map((m, i) => (
              <div key={i} className={styles.barGroup}>
                <div className={styles.barWrap}>
                  <div
                    className={styles.bar}
                    style={{ height: `${(m.value / MAX_REVENUE) * 100}%` }}
                    title={`₦${m.value.toLocaleString()}`}
                  >
                    <span className={styles.barTooltip}>₦{(m.value / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                <span className={styles.barLabel}>{m.month}</span>
              </div>
            ))}
          </div>
          <div className={styles.barChartFooter}>
            <span>Total: <strong>₦4.6M</strong></span>
            <span className={styles.up}>▲ 18.4% vs last period</span>
          </div>
        </div>

        {/* Orders area chart */}
        <div className={`card ${styles.chartCard}`}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Orders Over Time</h2>
            <span className={styles.chartSubtitle}>Monthly orders</span>
          </div>
          <div className={styles.areaChart}>
            {MONTHLY_REVENUE.map((m, i) => {
              const maxOrders = Math.max(...MONTHLY_REVENUE.map(x => x.orders));
              const h = (m.orders / maxOrders) * 100;
              return (
                <div key={i} className={styles.areaGroup}>
                  <div className={styles.areaWrap}>
                    <div className={styles.areaFill} style={{ height: `${h}%` }}>
                      <span className={styles.areaLabel}>{m.orders}</span>
                    </div>
                  </div>
                  <span className={styles.barLabel}>{m.month}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.barChartFooter}>
            <span>Total: <strong>413 orders</strong></span>
            <span className={styles.up}>▲ 12.1% vs last period</span>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className={styles.bottomRow}>
        {/* Top products */}
        <div className={`card ${styles.panel}`}>
          <h2 className={styles.panelTitle}>Top Products</h2>
          <div className={styles.productRankList}>
            {TOP_PRODUCTS.map((p, i) => (
              <div key={i} className={styles.rankItem}>
                <span className={styles.rankNum}>#{i + 1}</span>
                <div className={styles.rankInfo}>
                  <p className={styles.rankName}>{p.name}</p>
                  <div className={styles.rankBar}>
                    <div className={styles.rankBarFill} style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
                <div className={styles.rankStats}>
                  <span className={styles.rankSales}>{p.sales} sold</span>
                  <span className={styles.rankRevenue}>₦{(p.revenue / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources — donut-style */}
        <div className={`card ${styles.panel}`}>
          <h2 className={styles.panelTitle}>Traffic Sources</h2>
          <div className={styles.trafficList}>
            {TRAFFIC_SOURCES.map((src, i) => (
              <div key={i} className={styles.trafficItem}>
                <div className={styles.trafficLeft}>
                  <span className={styles.trafficDot} style={{ background: src.color }} />
                  <span className={styles.trafficLabel}>{src.label}</span>
                </div>
                <div className={styles.trafficBarWrap}>
                  <div className={styles.trafficBarFill} style={{ width: `${src.pct}%`, background: src.color }} />
                </div>
                <span className={styles.trafficPct} style={{ color: src.color }}>{src.pct}%</span>
              </div>
            ))}
          </div>

          {/* Recent reviews */}
          <h2 className={styles.panelTitle} style={{ marginTop: '1.5rem' }}>Recent Reviews</h2>
          <div className={styles.reviewList}>
            {RECENT_REVIEWS.map((r, i) => (
              <div key={i} className={styles.reviewItem}>
                <div className={styles.reviewStars}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
                <p className={styles.reviewMeta}>{r.customer} · {r.product} · {r.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
