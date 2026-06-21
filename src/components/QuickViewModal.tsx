'use client';

import React from 'react';
import { useExtraFeatures } from './ExtraFeaturesProvider';
import { useCart } from './CartProvider';
import styles from '@/styles/components.module.css';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useExtraFeatures();
  const { addToCart } = useCart();

  if (!quickViewProduct) return null;

  return (
    <div className={styles.modalOverlay} onClick={() => setQuickViewProduct(null)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={() => setQuickViewProduct(null)} aria-label="Close modal">
          &times;
        </button>
        <div className={styles.modalGrid}>
          <div className={styles.modalImageArea}>
            <img
              src={quickViewProduct.image || '/logo.jpg'}
              alt={quickViewProduct.title}
              className={styles.modalImage}
            />
          </div>
          <div>
            <span className={`badge ${quickViewProduct.businessType === 'solar' ? 'badge-solar' : 'badge-mush'}`} style={{ marginBottom: '0.75rem' }}>
              {quickViewProduct.businessType === 'solar' ? 'Solar Cleaning' : 'Mushroom Packaging'}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {quickViewProduct.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {'★'.repeat(5)} <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem', fontSize: '0.8rem' }}>(4.8 Rating)</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              {quickViewProduct.description}
            </p>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>
              ${quickViewProduct.price.toFixed(2)}
            </div>

            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Specifications:</h4>
            <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: 'var(--border-radius-md)', padding: '0.75rem', marginBottom: '1.5rem' }}>
              {Object.entries(quickViewProduct.specs || {}).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.25rem 0' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{k}</span>
                  <span style={{ color: 'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>

            {quickViewProduct.stock > 0 ? (
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  addToCart({
                    id: quickViewProduct.id,
                    title: quickViewProduct.title,
                    price: quickViewProduct.price,
                    image: quickViewProduct.image,
                    businessType: quickViewProduct.businessType,
                    quantity: 1
                  });
                  setQuickViewProduct(null);
                }}
              >
                Add To Cart
              </button>
            ) : (
              <div style={{ color: '#ef4444', fontWeight: 700, textAlign: 'center', padding: '0.5rem' }}>
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
