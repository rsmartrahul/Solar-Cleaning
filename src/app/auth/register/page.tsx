'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/components/AuthProvider';
import styles from '@/styles/auth.module.css';
import shopStyles from '@/styles/shop.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const res = await register(email, password, name);
      
      if (!res.success) {
        setError(res.error || 'Registration failed');
      } else {
        router.push('/shop'); // Route to shop on successful registration
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
            <h1 className={styles.authTitle}>Create Account</h1>
            <p className={styles.authSubtitle}>Sign up to browse and order from both eco portals.</p>

            {error && (
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--border-radius-md)', color: 'rgb(239, 68, 68)', fontSize: '0.85rem', fontWeight: 600 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className={shopStyles.formGroup}>
                <label className={shopStyles.formGroupLabel}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={shopStyles.formInput}
                  required
                />
              </div>

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

              <div className={shopStyles.formGroup}>
                <label className={shopStyles.formGroupLabel}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <p style={{ fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <Link href="/auth/login" className={styles.authLink}>
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
