import styles from './Dashboard.module.css';

export default function VendorDashboardPage() {
  return (
    <div>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p className={styles.statValue}># 1,240,500</p>
          <span className={styles.statChange}>+12.5% from last month</span>
        </div>
        <div className={styles.statCard}>
          <h3>Active Orders</h3>
          <p className={styles.statValue}>42</p>
          <span className={styles.statChange}>15 pending fulfillment</span>
        </div>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p className={styles.statValue}>128</p>
          <span className={styles.statChange}>3 low on stock</span>
        </div>
      </div>

      <div className={styles.recentOrders}>
        <h3>Recent Orders</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD-8921</td>
              <td>Sarah Martins</td>
              <td>iPhone 15 Pro Max</td>
              <td><span className={styles.badgePending}>Pending</span></td>
              <td>#1,450,000</td>
            </tr>
            <tr>
              <td>#ORD-8920</td>
              <td>Tunde Oloye</td>
              <td>Samsung Air Conditioner 1.5HP</td>
              <td><span className={styles.badgeShipped}>Shipped</span></td>
              <td>#350,000</td>
            </tr>
            <tr>
              <td>#ORD-8919</td>
              <td>Grace Okafor</td>
              <td>Wireless Bluetooth Headphones</td>
              <td><span className={styles.badgeDelivered}>Delivered</span></td>
              <td>#45,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
