import Link from 'next/link';
import styles from './ProductCard.module.css';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  isFlashSale?: boolean;
  itemsLeft?: number;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.imageWrapper}>
        {/* Tags */}
        {product.isFlashSale && <span className={styles.flashTag}>⚡ Flash Sale</span>}
        {discount && <span className={styles.discountTag}>-{discount}%</span>}

        <img
          src={product.image}
          alt={product.name}
          className={styles.imagePlaceholder}
        />

        {/* Items left indicator */}
        {product.itemsLeft !== undefined && product.itemsLeft <= 20 && (
          <div className={styles.itemsLeft}>
            <div
              className={styles.itemsLeftBar}
              style={{ width: `${(product.itemsLeft / 20) * 100}%` }}
            />
            <span>{product.itemsLeft} items left</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <span className={styles.ratingNum}>{product.rating}</span>
          </div>
        )}

        <div className={styles.priceRow}>
          <div className={styles.priceStack}>
            <span className={styles.price}>₦{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>₦{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button className={styles.addToCart} aria-label="Add to cart">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
