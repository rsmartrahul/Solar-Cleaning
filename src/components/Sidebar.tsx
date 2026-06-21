'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/components.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? styles.sidebarLinkActive : '';
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <img src="/logo.jpg" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
        <span className={styles.sidebarTitle}>Admin Console</span>
      </div>

      <nav className={styles.sidebarMenu}>
        <Link href="/admin" className={`${styles.sidebarLink} ${isActive('/admin')}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard Stats
        </Link>

        <Link href="/admin/products" className={`${styles.sidebarLink} ${isActive('/admin/products')}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          Manage Products
        </Link>

        <Link href="/admin/orders" className={`${styles.sidebarLink} ${isActive('/admin/orders')}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Manage Orders
        </Link>

        <div style={{ height: '2px', background: 'var(--border)', margin: '1rem 0' }} />

        <Link href="/shop" className={styles.sidebarLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Exit Admin Mode
        </Link>
      </nav>
    </aside>
  );
}
