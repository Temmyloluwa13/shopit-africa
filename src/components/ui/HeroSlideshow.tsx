"use client";

import { useState, useEffect } from 'react';
import styles from './HeroSlideshow.module.css';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80',
    title: 'Premium Gadgets',
    subtitle: 'Upgrade your digital lifestyle with top-tier gadgets'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
    title: 'Exclusive Footwear',
    subtitle: 'Walk the streets in the finest vibrant streetwear'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
    title: 'Immersive Audio Gear',
    subtitle: 'Crystal clear sound to elevate your everyday experience'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80',
    title: 'Skincare & Beauty',
    subtitle: 'Discover premium self-care and beauty essentials'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    title: 'Modern Home Decor',
    subtitle: 'Elevate your living space with our exclusive furniture collection'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
    title: 'Fresh Groceries',
    subtitle: 'Farm-fresh ingredients delivered right to your door'
  }
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.slideshowContainer}>
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
        >
          <img src={slide.image} alt={slide.title} className={styles.image} />
          
          {/* Overlay to ensure text readability if needed */}
          <div className={styles.overlay} />
        </div>
      ))}

      {/* Pagination indicators */}
      <div className={styles.indicators}>
        {SLIDES.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
