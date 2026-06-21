import React from 'react';
import styles from '@/styles/pages.module.css';

export default function FAQPage() {
  return (
    <div className={styles.container} style={{ minHeight: '60vh', padding: '6rem 2rem', textAlign: 'center' }}>
      <h1 className={styles.sectionTitle}>Frequently Asked Questions</h1>
      <p className={styles.heroSubtitle} style={{ color: 'var(--text-secondary)' }}>
        Our FAQ section is currently being updated. Please contact support for any questions.
      </p>
    </div>
  );
}
