'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/components/AuthProvider';
import styles from '@/styles/auth.module.css';
import shopStyles from '@/styles/shop.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const res = await login(email, password);
      
      if (!res.success) {
        setError(res.error || 'Invalid credentials');
      } else {
        router.push('/shop'); // Route to shop on successful login
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={shopStyles.layout}>
      <Navbar />

      <main className={shopStyles.mainContent}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <h1 className={styles.authTitle}>Welcome Back</h1>
            <p className={styles.authSubtitle}>Log in to access your orders and account settings.</p>

            {error && (
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--border-radius-md)', color: 'rgb(239, 68, 68)', fontSize: '0.85rem', fontWeight: 600 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className={shopStyles.formGroup}>
                <label className={shopStyles.formGroupLabel}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={shopStyles.formInput}
                  required
                />
              </div>

              <div className={shopStyles.formGroup}>
                <label className={shopStyles.formGroupLabel}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={shopStyles.formInput}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', border: 'none' }}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <Link href="/auth/register" className={styles.authLink}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
