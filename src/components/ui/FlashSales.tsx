'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FlashSales.module.css';

import { MOCK_PRODUCTS } from '@/data/mockProducts';

// Map our generic mock products to the structure expected by FlashSales
const FLASH_DEALS = MOCK_PRODUCTS.filter(p => p.isFlashSale).map(p => {
  const oldPrice = p.originalPrice || Math.round(p.price * 1.3);
  const discount = Math.round((1 - p.price / oldPrice) * 100);
  const totalItems = Math.max(50, (p.itemsLeft || 10) * 3);
  return {
    id: p.id,
    title: p.name,
    price: p.price,
    oldPrice: oldPrice,
    discount: discount,
    itemsLeft: p.itemsLeft || 10,
    totalItems: totalItems,
    image: p.image,
  };
});

export default function FlashSales() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Generate a fixed end time (e.g., end of today)
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const difference = endOfDay.getTime() - now.getTime();
      
      if (difference > 0) {
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);
        
        return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
      }
      return '00h : 00m : 00s';
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.title}>
            <span>⚡</span>
            Flash Sales
          </div>
          {timeLeft && (
            <div className={styles.timer}>
              Time Left: {timeLeft}
            </div>
          )}
        </div>
        <Link href="/flash-sales" className={styles.seeAll}>
          SEE ALL <span>→</span>
        </Link>
      </div>

      <div className={styles.trackWrapper}>
        <div className={styles.track}>
          {FLASH_DEALS.map((deal) => (
            <Link href={`/product/${deal.id}`} key={deal.id} className={styles.card}>
              <span className={styles.badge}>-{deal.discount}%</span>
              
              <div className={styles.imageWrapper}>
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className={styles.productImage}
                  sizes="160px"
                />
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{deal.title}</h3>
                
                <span className={styles.price}>₦ {deal.price.toLocaleString()}</span>
                <span className={styles.oldPrice}>₦ {deal.oldPrice.toLocaleString()}</span>
                
                <div className={styles.stockWrapper}>
                  <span className={styles.stockText}>{deal.itemsLeft} items left</span>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${Math.min(100, Math.max(0, (deal.itemsLeft / deal.totalItems) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
