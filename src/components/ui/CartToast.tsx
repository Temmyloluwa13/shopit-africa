'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import styles from './CartToast.module.css';

export default function CartToast() {
  const { toasts } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={styles.toast}>
          <span className={styles.checkIcon}>✓</span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
