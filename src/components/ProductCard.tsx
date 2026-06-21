'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';
import styles from '@/styles/components.module.css';

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    businessType: 'solar' | 'mushroom';
    image: string;
    stock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product detail page when clicking the button
    if (product.stock > 0) {
      addToCart(product);
      alert(`${product.title} added to cart!`);
    }
  };

  return (
    <Link href={`/shop/${product.id}`} className={styles.productCard}>
      <div className={styles.productImageWrapper}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
        <span
          className={`badge ${styles.productTypeBadge} ${
            product.businessType === 'solar' ? 'badge-solar' : 'badge-mush'
          }`}
        >
          {product.businessType === 'solar' ? 'Solar Clean' : 'Mushroom'}
        </span>
      </div>

      <div className={styles.productContent}>
        <span className={styles.productCategory}>{product.category}</span>
        <h3 className={styles.productTitle}>{product.title}</h3>
        
        <div className={styles.productPriceRow}>
          <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
          
          {product.stock > 0 ? (
            <button
              onClick={handleAddToCart}
              className={styles.addToCartBtn}
              title="Add to Cart"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          ) : (
            <span className={styles.outOfStockText}>Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}
