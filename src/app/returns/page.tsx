import React from 'react';
import styles from '@/styles/pages.module.css';

export default function ReturnsPage() {
  return (
    <div className={styles.container} style={{ minHeight: '60vh', padding: '6rem 2rem', textAlign: 'center' }}>
      <h1 className={styles.sectionTitle}>Return Policy</h1>
      <p className={styles.heroSubtitle} style={{ color: 'var(--text-secondary)' }}>
        Our return policy documentation is currently being updated.
      </p>
    </div>
  );
}
