'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/components/AuthProvider';
import { Order, Product } from '@/lib/db';
import styles from '@/styles/admin.module.css';
import compStyles from '@/styles/components.module.css';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;

    async function fetchData() {
      try {
        setLoading(true);
        const [ordersRes, productsRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/products'),
        ]);

        if (ordersRes.ok && productsRes.ok) {
          const ordersData = await ordersRes.json();
          const productsData = await productsRes.json();
          setOrders(ordersData);
          setProducts(productsData);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  // Auth gate check
  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid var(--border)',
          borderTop: '4px solid var(--primary)',
          borderRadius: '50%',
          animation: 'pulseGlow 1.5s infinite linear'
        }} />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
        <h2>Access Denied</h2>
        <p style={{ margin: '1rem 0 2rem 0', color: 'var(--text-secondary)' }}>
          You must be logged in as an administrator to access the administrative dashboard.
        </p>
        <Link href="/auth/login" className="btn btn-primary">
          Log In as Admin
        </Link>
      </div>
    );
  }

  // Dashboard calculation aggregates
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending').length;
  const totalProducts = products.length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className={compStyles.adminLayout}>
      <Sidebar />

      <main className={styles.adminContent}>
        <div className={styles.adminTitleRow}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800 }}>Dashboard Overview</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Real-time statistics for solar cleaning & mushroom packaging portals.</p>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary)' }}>Active Session: Admin</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
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
        ) : (
          <>
            {/* Metrics Grid */}
            <div className={styles.dashboardGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Total Sales</span>
                <span className={styles.statValue}>${totalRevenue.toFixed(2)}</span>
                <span className={styles.statDesc}>Gross e-commerce sales</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Total Orders</span>
                <span className={styles.statValue}>{totalOrders}</span>
                <span className={styles.statDesc}>Placed across both categories</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Pending Deliveries</span>
                <span className={styles.statValue}>{pendingOrders}</span>
                <span className={styles.statDesc}>Orders needing packing/shipping</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Catalog Size</span>
                <span className={styles.statValue}>{totalProducts}</span>
                <span className={styles.statDesc}>Active items in shop list</span>
              </div>
            </div>

            {/* Custom SVG Trend Chart & Recent List split */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
              
              {/* Sales Chart Card */}
              <div className={styles.statCard} style={{ gap: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>Sales Trends</h3>
                <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)' }}>
                  {/* Quick simulated bar charts */}
                  {[35, 60, 45, 75, 90, 65, 80, 100].map((height, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '8%', height: '100%', justifyContent: 'flex-end', gap: '0.5rem', paddingBottom: '10px' }}>
                      <div style={{ width: '100%', height: `${height * 0.7}%`, background: 'linear-gradient(to top, var(--primary), var(--secondary))', borderRadius: '4px 4px 0 0' }} />
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>W{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className={styles.statCard} style={{ gap: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((ord) => (
                      <div key={ord.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>{ord.customerName}</strong>
                          <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.7rem' }}>{ord.id} | {new Date(ord.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontWeight: 800, color: 'var(--primary)' }}>${ord.totalAmount.toFixed(2)}</span>
                          <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{ord.orderStatus}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>No orders placed yet.</p>
                  )}
                </div>
              </div>

            </div>
          </>
        )}
      </main>

      <div style={{ display: 'block', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
        <BottomNav />
      </div>
    </div>
  );
}
