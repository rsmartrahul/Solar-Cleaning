'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/components/AuthProvider';
import { Order } from '@/lib/db';
import styles from '@/styles/auth.module.css';
import shopStyles from '@/styles/shop.module.css';

export default function ProfilePage() {
  const { user, changePassword, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Password change states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    async function fetchUserOrders() {
      try {
        setLoadingOrders(true);
        const res = await fetch(`/api/orders?email=${user?.email}`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    }
    fetchUserOrders();
  }, [user]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    try {
      setUpdatingPassword(true);
      const res = await changePassword(oldPassword, newPassword);

      if (!res.success) {
        setPasswordError(res.error || 'Failed to update password.');
      } else {
        setPasswordSuccess('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (err) {
      setPasswordError('An error occurred. Please try again.');
    } finally {
      setUpdatingPassword(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return styles.statusPending;
      case 'Processing':
        return styles.statusProcessing;
      case 'Shipped':
        return styles.statusShipped;
      case 'Delivered':
        return styles.statusDelivered;
      default:
        return '';
    }
  };

  if (authLoading) {
    return (
      <div className={shopStyles.layout}>
        <Navbar />
        <main className={shopStyles.mainContent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid var(--border)',
            borderTop: '4px solid var(--primary)',
            borderRadius: '50%',
            animation: 'pulseGlow 1.5s infinite linear'
          }} />
        </main>
        <BottomNav />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={shopStyles.layout}>
        <Navbar />
        <main className={shopStyles.mainContent} style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h2>Access Denied</h2>
          <p style={{ margin: '1rem 0 2rem 0', color: 'var(--text-secondary)' }}>
            Please log in or sign up to view your account dashboard and track orders.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/auth/login" className="btn btn-primary">
              Log In
            </Link>
            <Link href="/auth/register" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className={shopStyles.layout}>
      <Navbar />

      <main className={shopStyles.mainContent}>
        <div className="container">
          <h1 className={shopStyles.bannerTitle} style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
            My Account Dashboard
          </h1>

          <div className={styles.profileGrid}>
            
            {/* Left Column: Account Details & Change Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Profile Details Card */}
              <div className={styles.profileCard}>
                <div className={styles.avatarSection}>
                  <div className={styles.avatar}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>{user.name}</h2>
                  <span className={`badge ${user.role === 'admin' ? 'badge-solar' : 'badge-mush'}`}>
                    {user.role === 'admin' ? 'System Administrator' : 'Customer Account'}
                  </span>
                </div>

                <div className={styles.profileDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Email Address</span>
                    <span className={styles.detailValue}>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Change Password Card */}
              <div className={styles.profileCard}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                  Update Password
                </h3>

                {passwordError && (
                  <div style={{ padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--border-radius-sm)', color: 'rgb(239, 68, 68)', fontSize: '0.8rem', fontWeight: 600 }}>
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div style={{ padding: '0.6rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: 'var(--border-radius-sm)', color: 'rgb(34, 197, 94)', fontSize: '0.8rem', fontWeight: 600 }}>
                    {passwordSuccess}
                  </div>
                )}

                <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className={shopStyles.formGroup}>
                    <label className={shopStyles.formGroupLabel}>Current Password</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className={shopStyles.formInput}
                      required
                    />
                  </div>

                  <div className={shopStyles.formGroup}>
                    <label className={shopStyles.formGroupLabel}>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className={shopStyles.formInput}
                      required
                    />
                  </div>

                  <div className={shopStyles.formGroup}>
                    <label className={shopStyles.formGroupLabel}>Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className={shopStyles.formInput}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={updatingPassword}
                    className="btn btn-primary"
                    style={{ width: '100%', border: 'none', padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                  >
                    {updatingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column: Order History */}
            <div className={styles.ordersSection}>
              <h2 className={styles.ordersTitle}>Order History</h2>

              {loadingOrders ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{
                    display: 'inline-block',
                    width: '30px',
                    height: '30px',
                    border: '3px solid var(--border)',
                    borderTop: '3px solid var(--primary)',
                    borderRadius: '50%',
                    animation: 'pulseGlow 1.5s infinite linear'
                  }} />
                </div>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <span className={styles.orderId}>{order.id}</span>
                        <span className={styles.orderDate} style={{ marginLeft: '1rem' }}>
                          {new Date(order.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <span className={`badge ${getStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className={styles.orderBody}>
                      <div className={styles.orderItems}>
                        {order.items.map((item, index) => (
                          <div key={index} className={styles.orderItemRow}>
                            <span>
                              {item.title} <strong>x {item.quantity}</strong>
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.orderTotalBlock}>
                        <span className={styles.orderTotalLabel}>Grand Total</span>
                        <div className={styles.orderTotalAmount}>${order.totalAmount.toFixed(2)}</div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                          Method: {order.paymentMethod} ({order.paymentStatus})
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-surface-elevated)', padding: '0.5rem 0.75rem', borderRadius: 'var(--border-radius-sm)' }}>
                      <strong>Shipping Address:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.postalCode} | Phone: {order.shippingAddress.phone}
                    </div>
                  </div>
                ))
              ) : (
                <div className={shopStyles.noProducts} style={{ padding: '4rem 2rem' }}>
                  <h3>No Orders Placed</h3>
                  <p style={{ margin: '0.5rem 0 1.5rem 0' }}>You haven't placed any orders yet.</p>
                  <Link href="/shop" className="btn btn-primary">
                    Explore Store
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
