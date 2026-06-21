import React from 'react';
import styles from '@/styles/topBar.module.css';

// Announcement bar displayed on desktop, hidden on mobile
export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <span>🌱 Sustainable Packaging Solutions</span>
      <span>☀️ Professional Solar Cleaning Equipment</span>
      <span>🚚 Free Shipping on Bulk Orders</span>
      <span>📞 +91 98765 43210</span>
      <span>✉️ support@solarcleanmycopack.com</span>
    </div>
  );
}
