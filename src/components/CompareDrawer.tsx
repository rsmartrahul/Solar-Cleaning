'use client';

import React, { useState } from 'react';
import { useExtraFeatures } from './ExtraFeaturesProvider';
import { useCart } from './CartProvider';
import styles from '@/styles/components.module.css';

export default function CompareDrawer() {
  const { compareList, toggleCompare, clearCompare } = useExtraFeatures();
  const { addToCart } = useCart();
  const [isOpenCompareTable, setIsOpenCompareTable] = useState(false);

  if (compareList.length === 0) return null;

  // Extract all unique specs keys across compared products
  const allSpecKeys = Array.from(
    new Set(compareList.flatMap((p) => Object.keys(p.specs || {})))
  );

  return (
    <>
      <div className={`${styles.compareDrawer} ${compareList.length > 0 ? styles.compareDrawerActive : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={styles.compareGrid}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Compare ({compareList.length}):</span>
            {compareList.map((prod) => (
              <div key={prod.id} className={styles.compareItem}>
                <img src={prod.image || '/logo.jpg'} alt={prod.title} className={styles.compareItemImg} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                  {prod.title}
                </span>
                <button
                  onClick={() => toggleCompare(prod)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgb(239, 68, 68)', fontSize: '0.9rem' }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={clearCompare}>
              Clear
            </button>
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => setIsOpenCompareTable(true)}>
              Compare Now
            </button>
          </div>
        </div>
      </div>

      {isOpenCompareTable && (
        <div className={styles.modalOverlay} onClick={() => setIsOpenCompareTable(false)}>
          <div className={styles.modalContent} style={{ maxWidth: '950px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setIsOpenCompareTable(false)}>
              &times;
            </button>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Product Comparison Table
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '0.75rem', borderBottom: '2px solid var(--border)' }}>Features</th>
                    {compareList.map((p) => (
                      <th key={p.id} style={{ padding: '0.75rem', borderBottom: '2px solid var(--border)', minWidth: '180px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <img src={p.image || '/logo.jpg'} alt={p.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                          <span style={{ fontWeight: 800 }}>{p.title}</span>
                          <span style={{ color: 'var(--primary)', fontWeight: 800 }}>${p.price}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>Category</td>
                    {compareList.map((p) => (
                      <td key={p.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>{p.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>Sector</td>
                    {compareList.map((p) => (
                      <td key={p.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', textTransform: 'capitalize' }}>
                        {p.businessType === 'solar' ? 'Solar Cleaning' : 'Mushroom Packaging'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>Stock Level</td>
                    {compareList.map((p) => (
                      <td key={p.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                        {p.stock > 0 ? `${p.stock} units` : 'Out of Stock'}
                      </td>
                    ))}
                  </tr>
                  {allSpecKeys.map((key) => (
                    <tr key={key}>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{key}</td>
                      {compareList.map((p) => (
                        <td key={p.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                          {p.specs[key] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}></td>
                    {compareList.map((p) => (
                      <td key={p.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', width: '100%' }}
                          onClick={() => {
                            addToCart({
                              id: p.id,
                              title: p.title,
                              price: p.price,
                              image: p.image,
                              businessType: p.businessType,
                              quantity: 1
                            });
                          }}
                        >
                          Add To Cart
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
