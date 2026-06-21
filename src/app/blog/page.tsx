import React from 'react';
import styles from '@/styles/pages.module.css';

export default function BlogPage() {
  return (
    <div className={styles.container} style={{ minHeight: '60vh', padding: '6rem 2rem', textAlign: 'center' }}>
      <h1 className={styles.sectionTitle}>Our Blog</h1>
      <p className={styles.heroSubtitle} style={{ color: 'var(--text-secondary)' }}>
        Articles about sustainable packaging and solar energy coming soon!
      </p>
    </div>
  );
}
