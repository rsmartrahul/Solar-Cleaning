import React from 'react';
import styles from '@/styles/pages.module.css';

export default function HelpPage() {
  return (
    <div className={styles.container} style={{ minHeight: '60vh', padding: '6rem 2rem', textAlign: 'center' }}>
      <h1 className={styles.sectionTitle}>Help Center</h1>
      <p className={styles.heroSubtitle} style={{ color: 'var(--text-secondary)' }}>
        Need assistance? Please visit our Contact Us page.
      </p>
    </div>
  );
}
