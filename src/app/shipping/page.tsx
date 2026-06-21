import React from 'react';
import styles from '@/styles/pages.module.css';

export default function ShippingPage() {
  return (
    <div className={styles.container} style={{ minHeight: '60vh', padding: '6rem 2rem', textAlign: 'center' }}>
      <h1 className={styles.sectionTitle}>Shipping Policy</h1>
      <p className={styles.heroSubtitle} style={{ color: 'var(--text-secondary)' }}>
        We offer delivery across India. Full shipping details are being updated.
      </p>
    </div>
  );
}
