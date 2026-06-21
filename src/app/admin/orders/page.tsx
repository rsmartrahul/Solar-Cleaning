'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/components/AuthProvider';
import { Order } from '@/lib/db';
import styles from '@/styles/admin.module.css';
import compStyles from '@/styles/components.module.css';
import authStyles from '@/styles/auth.module.css';

export default function AdminOrders() {
  const { user, loading: authLoading } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchOrders();
    }
  }, [user]);

  const handleUpdateStatus = async (orderId: string, field: 'orderStatus' | 'paymentStatus', value: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });

      if (res.ok) {
        fetchOrders(); // Refresh table data
        alert('Order updated successfully.');
      } else {
        alert('Failed to update order.');
      }
    } catch (err) {
      console.error('Update order error:', err);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return authStyles.statusPending;
      case 'Processing':
        return authStyles.statusProcessing;
      case 'Shipped':
        return authStyles.statusShipped;
      case 'Delivered':
        return authStyles.statusDelivered;
      default:
        return '';
    }
  };

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
          You must be logged in as an administrator to access customer orders.
        </p>
        <Link href="/auth/login" className="btn btn-primary">
          Log In as Admin
        </Link>
      </div>
    );
  }

  return (
    <div className={compStyles.adminLayout}>
      <Sidebar />

      <main className={styles.adminContent}>
        <div className={styles.adminTitleRow}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800 }}>Manage Orders</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>View, track, and update fulfillment status for customer orders.</p>
          </div>
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
          <div className={styles.tableContainer}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Info</th>
                  <th>Items Ordered</th>
                  <th>Total</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong style={{ color: 'var(--text-primary)' }}>{order.id}</strong>
                      </td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>{order.customerName}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{order.customerEmail}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{order.shippingAddress.phone}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '240px' }}>
                          {order.items.map((item, idx) => (
                            <span key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              • {item.title} (x{item.quantity})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ fontWeight: 800, color: 'var(--primary)' }}>
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td>
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => handleUpdateStatus(order.id, 'paymentStatus', e.target.value)}
                          className={styles.statusSelect}
                          style={{
                            background: order.paymentStatus === 'Paid' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                            color: order.paymentStatus === 'Paid' ? 'rgb(34, 197, 94)' : 'rgb(245, 158, 11)',
                            borderColor: order.paymentStatus === 'Paid' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateStatus(order.id, 'orderStatus', e.target.value)}
                          className={`${styles.statusSelect} ${getStatusClass(order.orderStatus)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
                      No customer orders have been placed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <div style={{ display: 'block', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
        <BottomNav />
      </div>
    </div>
  );
}
