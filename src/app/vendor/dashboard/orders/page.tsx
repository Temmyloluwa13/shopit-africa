'use client';

import { useState } from 'react';
import styles from './Orders.module.css';

type OrderStatus = 'ALL' | 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

const STATUS_COLORS: Record<string, string> = {
  PENDING:   '#F59E0B',
  CONFIRMED: '#3B82F6',
  SHIPPED:   '#8B5CF6',
  DELIVERED: '#22C55E',
  CANCELLED: '#EF4444',
};

const MOCK_ORDERS = [
  { id: 'ORD-9012', customer: 'Amara Okonkwo',   item: 'Luxury Wireless Headphones',      qty: 1, status: 'PENDING',   total: 45000,  date: '10 Apr 2026', avatar: 'A' },
  { id: 'ORD-9011', customer: 'Chidi Nwosu',      item: 'Premium Orange Sneakers (EU 43)', qty: 2, status: 'CONFIRMED', total: 65000,  date: '10 Apr 2026', avatar: 'C' },
  { id: 'ORD-9010', customer: 'Fatima Al-Hassan', item: 'Smart Home Security Camera 4K',   qty: 1, status: 'SHIPPED',   total: 28000,  date: '09 Apr 2026', avatar: 'F' },
  { id: 'ORD-9009', customer: 'Kwame Asante',     item: 'African Print Summer Dress XL',  qty: 1, status: 'DELIVERED', total: 15000,  date: '08 Apr 2026', avatar: 'K' },
  { id: 'ORD-9008', customer: 'Ngozi Eze',        item: 'Bluetooth Mechanical Keyboard',  qty: 1, status: 'DELIVERED', total: 38000,  date: '07 Apr 2026', avatar: 'N' },
  { id: 'ORD-9007', customer: 'Tunde Adeyemi',    item: 'Ankara Cushion Set (4-piece)',   qty: 2, status: 'CANCELLED', total: 17000,  date: '06 Apr 2026', avatar: 'T' },
  { id: 'ORD-9006', customer: 'Ife Okafor',       item: 'Solar Phone Charger 20000mAh',   qty: 3, status: 'DELIVERED', total: 58500,  date: '05 Apr 2026', avatar: 'I' },
  { id: 'ORD-9005', customer: 'Seun Aderemi',     item: 'Shea Butter Face Moisturiser',   qty: 5, status: 'SHIPPED',   total: 26000,  date: '04 Apr 2026', avatar: 'S' },
];

const STATUS_TABS: { label: string; value: OrderStatus }[] = [
  { label: 'All Orders', value: 'ALL' },
  { label: 'Pending',    value: 'PENDING' },
  { label: 'Confirmed',  value: 'CONFIRMED' },
  { label: 'Shipped',    value: 'SHIPPED' },
  { label: 'Delivered',  value: 'DELIVERED' },
  { label: 'Cancelled',  value: 'CANCELLED' },
];

export default function VendorOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('ALL');
  const [search, setSearch]       = useState('');
  const [selected, setSelected]   = useState<string[]>([]);

  const filtered = MOCK_ORDERS.filter(o => {
    const matchTab    = activeTab === 'ALL' || o.status === activeTab;
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase())
                     || o.id.toLowerCase().includes(search.toLowerCase())
                     || o.item.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const toggleSelect = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const allSelected = filtered.length > 0 && filtered.every(o => selected.includes(o.id));

  const toggleAll = () =>
    setSelected(allSelected ? [] : filtered.map(o => o.id));

  const counts = STATUS_TABS.reduce((acc, tab) => {
    acc[tab.value] = tab.value === 'ALL'
      ? MOCK_ORDERS.length
      : MOCK_ORDERS.filter(o => o.status === tab.value).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Orders</h1>
          <p className={styles.pageSubtitle}>{MOCK_ORDERS.length} total orders</p>
        </div>
        <div className={styles.headerActions}>
          <button className={`btn btn-outline ${styles.exportBtn}`} id="export-orders">
            ⬇ Export CSV
          </button>
        </div>
      </div>

      {/* Status tabs */}
      <div className={styles.tabBar}>
        {STATUS_TABS.map(tab => (
          <button
            key={tab.value}
            id={`tab-${tab.value.toLowerCase()}`}
            className={`${styles.tab} ${activeTab === tab.value ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
            {counts[tab.value] > 0 && (
              <span
                className={styles.tabBadge}
                style={{ background: activeTab === tab.value ? STATUS_COLORS[tab.value] || 'var(--primary)' : 'var(--border)' }}
              >
                {counts[tab.value]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search + bulk actions */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            id="order-search"
            type="text"
            placeholder="Search orders, customers…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        {selected.length > 0 && (
          <div className={styles.bulkActions}>
            <span className={styles.bulkCount}>{selected.length} selected</span>
            <button className="btn btn-outline" style={{ fontSize: '0.83rem', padding: '0.4rem 0.85rem' }}>Mark Shipped</button>
            <button className="btn btn-outline" style={{ fontSize: '0.83rem', padding: '0.4rem 0.85rem', color: '#EF4444', borderColor: '#EF4444' }}>Cancel</button>
          </div>
        )}
      </div>

      {/* Orders table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  id="select-all"
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className={styles.emptyRow}>
                  No orders match your filters.
                </td>
              </tr>
            ) : (
              filtered.map(order => (
                <tr key={order.id} className={selected.includes(order.id) ? styles.rowSelected : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                      className={styles.checkbox}
                    />
                  </td>
                  <td className={styles.orderId}>{order.id}</td>
                  <td>
                    <div className={styles.customerCell}>
                      <div className={styles.avatar}>{order.avatar}</div>
                      <span>{order.customer}</span>
                    </div>
                  </td>
                  <td className={styles.itemCell}>{order.item}</td>
                  <td className={styles.center}>{order.qty}</td>
                  <td>
                    <span
                      className={styles.statusBadge}
                      style={{
                        background: STATUS_COLORS[order.status] + '18',
                        color: STATUS_COLORS[order.status],
                        borderColor: STATUS_COLORS[order.status] + '30',
                      }}
                    >
                      {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className={styles.amount}>₦{order.total.toLocaleString()}</td>
                  <td className={styles.dateCell}>{order.date}</td>
                  <td>
                    <button
                      id={`view-${order.id}`}
                      className={styles.viewBtn}
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <span className={styles.paginationInfo}>Showing {filtered.length} of {MOCK_ORDERS.length} orders</span>
        <div className={styles.paginationBtns}>
          <button className={styles.pageBtn} disabled>← Prev</button>
          <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>Next →</button>
        </div>
      </div>
    </div>
  );
}
