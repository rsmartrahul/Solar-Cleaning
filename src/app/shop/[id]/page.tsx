'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/components/CartProvider';
import { Product } from '@/lib/db';
import styles from '@/styles/shop.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleQtyChange = (val: number) => {
    if (!product) return;
    const newQty = quantity + val;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity);
      alert(`${quantity}x ${product.title} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className={styles.layout}>
        <Navbar />
        <main className={styles.mainContent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid var(--border)',
            borderTop: '4px solid var(--primary)',
            borderRadius: '50%',
            animation: 'pulseGlow 1.5s infinite linear'
          }} />
        </main>
        <BottomNav />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.layout}>
        <Navbar />
        <main className={styles.mainContent} style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h2>Product Not Found</h2>
          <p style={{ margin: '1rem 0 2rem 0', color: 'var(--text-secondary)' }}>
            The product you are looking for does not exist or has been removed.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Back to Catalog
          </Link>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className="container">
          <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Catalog
          </Link>

          <div className={styles.detailsGrid}>
            {/* Product Image Section */}
            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.detailsImage}
              />
            </div>

            {/* Product Info Section */}
            <div className={styles.infoContainer}>
              <span className={`badge ${product.businessType === 'solar' ? 'badge-solar' : 'badge-mush'}`} style={{ width: 'fit-content', marginBottom: '0.75rem' }}>
                {product.businessType === 'solar' ? 'Solar Cleaning' : 'Mushroom packaging'}
              </span>
              
              <h1 className={styles.detailsTitle}>{product.title}</h1>
              <span className={styles.productCategory} style={{ marginBottom: '1rem', display: 'block' }}>Category: {product.category}</span>
              
              <div className={styles.detailsPrice}>${product.price.toFixed(2)}</div>
              
              <p className={styles.detailsDesc}>{product.description}</p>
              
              {product.stock > 0 ? (
                <>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Status: <span style={{ color: 'var(--secondary)', fontWeight: 800 }}>In Stock ({product.stock} available)</span>
                  </div>
                  
                  {/* Quantity and Cart Actions */}
                  <div className={styles.qtyRow}>
                    <span className={styles.qtyLabel}>Quantity</span>
                    <div className={styles.qtySelector}>
                      <button onClick={() => handleQtyChange(-1)} className={styles.qtyBtn}>-</button>
                      <input type="text" value={quantity} readOnly className={styles.qtyInput} />
                      <button onClick={() => handleQtyChange(1)} className={styles.qtyBtn}>+</button>
                    </div>
                    
                    <button
                      onClick={handleAddToCart}
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 2rem' }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--border-radius-md)', color: 'rgb(239, 68, 68)', fontWeight: 700 }}>
                  This product is currently out of stock.
                </div>
              )}

              {/* Dynamic Product Specifications */}
              {Object.keys(product.specs).length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.75rem' }}>Specifications</h3>
                  <table className={styles.specsTable}>
                    <tbody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key}>
                          <th>{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
