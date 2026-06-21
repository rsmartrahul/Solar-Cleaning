import React from 'react';
import styles from '@/styles/pages.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.container} style={{ minHeight: '60vh', padding: '6rem 2rem', textAlign: 'center' }}>
      <h1 className={styles.sectionTitle}>Privacy Policy</h1>
      <p className={styles.heroSubtitle} style={{ color: 'var(--text-secondary)' }}>
        Your privacy is important to us. Full privacy policy is being updated.
      </p>
    </div>
  );
}
