'use client';

import React from 'react';
import styles from '@/styles/hero.module.css';

const stats = [
  { value: '500+', label: 'Business Clients', icon: '👥' },
  { value: '50+', label: 'Products', icon: '📦' },
  { value: '100%', label: 'Eco-Friendly', icon: '🌿' },
  { value: '24/7', label: 'Support', icon: '🎧' },
];

const trustBadges = [
  'Bulk Orders Available',
  'Eco-Friendly Products',
  'Secure Payments',
  'Fast Delivery',
  'Dedicated Support',
];

export default function HeroStats() {
  return (
    <>
      {/* Statistics Section */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className={styles.trustSection}>
        <div className={styles.trustGrid}>
          {trustBadges.map((badge, idx) => (
            <div key={idx} className={styles.trustBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
