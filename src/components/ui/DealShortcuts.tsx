'use client';

import styles from './DealShortcuts.module.css';

const SHORTCUTS = [
  { id: 'awoof',    emoji: '🎉', label: 'Awoof Deals',    badge: 'HOT',  href: '/products?sort=flash', bg: '#FFF5E0' },
  { id: 'clearance',emoji: '🔖', label: 'Clearance Sale', badge: '80% OFF', href: '/products?sort=price_asc', bg: '#FFF0F0' },
  { id: 'fashion',  emoji: '👗', label: "Men's Fashion",  badge: null,   href: '/products?category=Fashion', bg: '#F0F0FF' },
  { id: 'buy2pay1', emoji: '🛒', label: 'Buy 2 Pay 1',  badge: 'NEW',  href: '/deals/buy-2-pay-1',  bg: '#F0FFF4' },
  { id: 'send',     emoji: '📦', label: 'Send Packages', badge: null,   href: '/services/logistics', bg: '#FFF8F0' },
  { id: 'picks',    emoji: '⭐', label: 'Top Picks',     badge: null,   href: '/products?sort=top',  bg: '#FFFAF0' },
  { id: 'call',     emoji: '📞', label: 'Call for Deals',badge: 'LIVE', href: 'tel:07006000000',     bg: '#F0FFF8' },
  { id: 'extra10',  emoji: '💰', label: 'Extra 10% Off', badge: '🔥',   href: '/deals/extra-10',    bg: '#FFF0FF' },
];

export default function DealShortcuts() {
  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.track}`}>
        {SHORTCUTS.map(s => (
          <a
            key={s.id}
            id={`shortcut-${s.id}`}
            href={s.href}
            className={styles.card}
            style={{ '--card-bg': s.bg } as React.CSSProperties}
          >
            <div className={styles.iconBox} style={{ background: s.bg }}>
              <span className={styles.emoji}>{s.emoji}</span>
              {s.badge && <span className={styles.badge}>{s.badge}</span>}
            </div>
            <span className={styles.label}>{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
