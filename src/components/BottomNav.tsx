'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';
import { useAuth } from './AuthProvider';
import styles from '@/styles/components.module.css';

export default function BottomNav() {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return '';
    return pathname.startsWith(path) ? styles.bottomNavItemActive : '';
  };

  return (
    <div className={styles.bottomNav}>
      <Link href="/" className={`${styles.bottomNavItem} ${isActive('/')}`}>
        <svg className={styles.bottomNavIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>Home</span>
      </Link>

      <Link href="/product" className={`${styles.bottomNavItem} ${isActive('/product')}`} style={{ position: 'relative' }}>
        <svg className={styles.bottomNavIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 4h14v2H5V4zM5 9h14v2H5V9zM5 14h14v2H5v-2z" />
        </svg>
        <span>Product</span>
      </Link>

      <Link href="/enquiry" className={`${styles.bottomNavItem} ${isActive('/enquiry')}`} style={{ position: 'relative' }}>
        <svg className={styles.bottomNavIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 12V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6" />
          <polyline points="22 12 12 19 2 12" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
        <span>Enquiry</span>
      </Link>

      <Link href="/cart" className={`${styles.bottomNavItem} ${isActive('/cart')}`} style={{ position: 'relative' }}>
        <svg className={styles.bottomNavIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {getCartCount() > 0 && (
          <span
            className={styles.cartBadge}
            style={{
              top: '2px',
              right: '18px',
            }}
          >
            {getCartCount()}
          </span>
        )}
        <span>Cart</span>
      </Link>

      <Link
        href={user ? '/profile' : '/auth/login'}
        className={`${styles.bottomNavItem} ${
          isActive(user ? '/profile' : '/auth/login')
        }`}
      >
        <svg className={styles.bottomNavIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>Account</span>
      </Link>
    </div>
  );
}
