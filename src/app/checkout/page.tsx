'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/components/AuthProvider';
import styles from '@/styles/shop.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'COD'>('Card');
  
  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing state
  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFullName(fullName || user.name);
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !orderSuccess) {
      router.push('/cart');
    }
  }, [cart, orderSuccess]);

  const shippingCost = getCartTotal() > 100 ? 0 : 15;
  const grandTotal = getCartTotal() + shippingCost;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !address || !city || !postalCode || !phone) {
      alert('Please fill in all shipping details.');
      return;
    }

    if (paymentMethod === 'Card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert('Please fill in card details.');
      return;
    }

    try {
      setProcessing(true);

      const orderBody = {
        customerEmail: email,
        customerName: fullName,
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          businessType: item.businessType,
        })),
        totalAmount: grandTotal,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          phone,
        },
        paymentMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderBody),
      });

      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Failed to place order');
        return;
      }

      // Success!
      setOrderSuccess(data);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to connect to checkout services.');
    } finally {
      setProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className={styles.layout}>
        <Navbar />
        <main className={styles.mainContent}>
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center', padding: '4rem 1.5rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.1)',
              color: 'rgb(34, 197, 94)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              border: '2px solid rgb(34, 197, 94)'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 className={styles.bannerTitle} style={{ fontSize: '2rem' }}>Order Placed Successfully!</h1>
            <p style={{ margin: '1rem 0 2rem 0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Thank you for your business. Your order ID is <strong style={{ color: 'var(--text-primary)' }}>{orderSuccess.id}</strong>. 
              We have sent a confirmation details details to <strong>{orderSuccess.customerEmail}</strong>.
            </p>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--border-radius-lg)', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>Shipping Details</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}><strong>Recipient:</strong> {orderSuccess.shippingAddress.fullName}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}><strong>Address:</strong> {orderSuccess.shippingAddress.address}, {orderSuccess.shippingAddress.city} - {orderSuccess.shippingAddress.postalCode}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}><strong>Phone:</strong> {orderSuccess.shippingAddress.phone}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}><strong>Total Amount Paid:</strong> <strong style={{ color: 'var(--primary)' }}>${orderSuccess.totalAmount.toFixed(2)}</strong></p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/shop" className="btn btn-secondary">
                Continue Shopping
              </Link>
              {user && (
                <Link href="/profile" className="btn btn-primary">
                  Track Order
                </Link>
              )}
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className="container">
          <h1 className={styles.bannerTitle} style={{ marginBottom: '2rem', textAlign: 'left' }}>
            Checkout
          </h1>

          <form onSubmit={handleSubmitOrder} className={styles.checkoutGrid}>
            {/* Checkout Form */}
            <div className={styles.checkoutForm}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                Delivery Information
              </h2>

              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!!user}
                  placeholder="name@example.com"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel}>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel}>Shipping Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address, Apartment, Suite"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formGroupLabel}>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formGroupLabel}>Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10001"
                    className={styles.formInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={styles.formInput}
                  required
                />
              </div>

              {/* Payment Section */}
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
                Payment Method
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  onClick={() => setPaymentMethod('Card')}
                  className={`${styles.paymentOption} ${paymentMethod === 'Card' ? styles.paymentOptionActive : ''}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>Credit / Debit Card</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Instant simulated checkout via card payment.</span>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('COD')}
                  className={`${styles.paymentOption} ${paymentMethod === 'COD' ? styles.paymentOptionActive : ''}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>Cash on Delivery (COD)</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pay cash when the packages arrive at your doorstep.</span>
                  </div>
                </div>
              </div>

              {paymentMethod === 'Card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', marginTop: '0.5rem', border: '1px solid var(--border)' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formGroupLabel}>Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className={styles.formInput}
                      style={{ background: 'var(--bg-surface)' }}
                    />
                  </div>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formGroupLabel}>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className={styles.formInput}
                        style={{ background: 'var(--bg-surface)' }}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formGroupLabel}>CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className={styles.formInput}
                        style={{ background: 'var(--bg-surface)' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Side Order Summary Column */}
            <div className={styles.cartSummaryCard}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Summary
              </h3>

              <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <div style={{ color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
                      <span>{item.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity}</span>
                    </div>
                    <span style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              <div className={styles.summaryTotalRow}>
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>

              <Link href="/cart" style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '0.5rem', display: 'block' }}>
                Back to Cart
              </Link>
            </div>
          </form>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
