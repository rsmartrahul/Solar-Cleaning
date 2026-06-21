'use client';

import React from 'react';
import styles from '@/styles/home.module.css';

const features = [
  { title: 'Premium Quality Products', desc: 'Tested and certified for maximum performance and durability.', icon: '🏆' },
  { title: 'Sustainable Solutions', desc: '100% eco-friendly and home-compostable packaging alternatives.', icon: '🌱' },
  { title: 'Fast Delivery', desc: 'Expedited shipping network across all major business hubs.', icon: '🚚' },
  { title: 'Bulk Order Support', desc: 'Dedicated B2B tier pricing for enterprise volume needs.', icon: '📦' },
  { title: 'Secure Payments', desc: 'Enterprise-grade encrypted transaction processing.', icon: '🔒' },
  { title: 'Dedicated Customer Service', desc: '24/7 priority support for all B2B and retail clients.', icon: '📞' }
];

export default function WhyChooseUs() {
  return (
    <section className={`${styles.sectionPadding} ${styles.whyChooseUsSection}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Us</h2>
          <p className={styles.sectionSubtitle}>Industry-leading standards for Solar Cleaning & Eco-Packaging.</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
