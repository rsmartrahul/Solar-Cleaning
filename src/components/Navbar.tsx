'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useCart } from './CartProvider';
import { useAuth } from './AuthProvider';
import { useExtraFeatures } from './ExtraFeaturesProvider';
import styles from '@/styles/components.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const { wishlist, darkMode, toggleDarkMode } = useExtraFeatures();

  const [searchQuery, setSearchQuery] = useState('');
  const [productsOpen, setProductsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLinkActive = (path: string) => {
    return pathname === path ? styles.navLinkActive : '';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={styles.headerWrapper}>


      {/* Main Navbar */}
      <nav className={`${styles.navbar} ${styles.navbarPremium}`}>
        <Link href="/" className={styles.logoContainer}>
          <img src="/logo.jpg" alt="Logo" className={styles.logoImage} />

        </Link>

        {/* Mega Navigation Menu */}
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${isLinkActive('/')}`}>
            Home
          </Link>

          <Link href="/product" className={`${styles.navLink} ${isLinkActive('/product')}`}>Product</Link>

          <Link href="/industries" className={`${styles.navLink} ${isLinkActive('/industries')}`}>
            Industries
          </Link>
          <Link href="/about" className={`${styles.navLink} ${isLinkActive('/about')}`}>
            About Us
          </Link>
          <Link href="/contact" className={`${styles.navLink} ${isLinkActive('/contact')}`}>Contact</Link>
          <Link href="/enquiry" className={`${styles.navLink} ${isLinkActive('/enquiry')}`}>Enquiry</Link>
        </div>

        <div className={styles.navActions}>
          {/* B2B Smart Search Bar */}
          <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          {/* Wishlist Icon Counter */}
          <Link href="/profile" className={styles.cartIconContainer} title="Wishlist Items">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.length > 0 && <span className={styles.cartBadge}>{wishlist.length}</span>}
          </Link>

          {/* Shopping Cart Icon */}
          <Link href="/cart" className={styles.cartIconContainer} title="View Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {getCartCount() > 0 && <span className={styles.cartBadge}>{getCartCount()}</span>}
          </Link>

          {/* User Profile Dropdown */}
          <div className={styles.navDropdown} ref={profileRef}>
            <button
              className={styles.cartIconContainer}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setProfileOpen(!profileOpen)}
              title="User Account"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            {profileOpen && (
              <div className={`${styles.dropdownMenu} ${styles.dropdownMenuRight}`}>
                {user ? (
                  <>
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {user.name}
                    </div>
                    <Link href="/profile" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
                      My Profile & Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link href="/admin" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}

                    {/* Theme Toggles inside Profile */}
                    <div className={styles.dropdownDivider}></div>
                    <button className={styles.dropdownItem} onClick={() => { toggleTheme(); setProfileOpen(false); }}>
                      {theme === 'solar' ? '☀️ Switch to Solar Theme' : '🍄 Switch to Myco Theme'}
                    </button>
                    <button className={styles.dropdownItem} onClick={() => { toggleDarkMode(); setProfileOpen(false); }}>
                      {darkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
                    </button>

                    <div className={styles.dropdownDivider}></div>
                    <button onClick={() => { logout(); setProfileOpen(false); }} className={styles.dropdownItem} style={{ color: 'rgb(239, 68, 68)' }}>
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
                      Sign In
                    </Link>
                    <Link href="/auth/register" className={styles.dropdownItem} onClick={() => setProfileOpen(false)}>
                      Create Account
                    </Link>
                    <div className={styles.dropdownDivider}></div>
                    <button className={styles.dropdownItem} onClick={() => { toggleDarkMode(); setProfileOpen(false); }}>
                      {darkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Request Quote B2B Button */}
          <button
            onClick={() => {
              const el = document.getElementById('b2b-quote-form');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                router.push('/contact#b2b-quote-form');
              }
            }}
            className={styles.headerQuoteBtn}
          >
            Request Quote
          </button>
        </div>
      </nav>
    </div>
  );
}
