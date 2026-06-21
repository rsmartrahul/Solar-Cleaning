'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { useCart } from '@/components/CartProvider';
import styles from '@/styles/shop.module.css';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const shippingCost = getCartTotal() > 100 || getCartTotal() === 0 ? 0 : 15;
  const grandTotal = getCartTotal() + shippingCost;

  return (
    <div className={styles.layout}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className="container">
          <h1 className={styles.bannerTitle} style={{ marginBottom: '2rem', textAlign: 'left' }}>
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className={styles.noProducts} style={{ padding: '6rem 2rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <h3>Your cart is empty</h3>
              <p style={{ margin: '0.5rem 0 1.5rem 0' }}>Looks like you haven't added any products to your cart yet.</p>
              <Link href="/shop" className="btn btn-primary">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className={styles.cartLayout}>
              {/* Cart Items List */}
              <div className={styles.cartList}>
                {cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.cartItemImage}
                    />
                    
                    <div className={styles.cartItemDetails}>
                      <span className={`badge ${item.businessType === 'solar' ? 'badge-solar' : 'badge-mush'}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', marginBottom: '0.25rem' }}>
                        {item.businessType === 'solar' ? 'Solar Clean' : 'Mushroom Packaging'}
                      </span>
                      <h3 className={styles.cartItemTitle}>{item.title}</h3>
                      <span className={styles.cartItemPrice}>${item.price.toFixed(2)}</span>
                    </div>

                    {/* Actions: Quantity Selector & Delete */}
                    <div className={styles.cartItemActions}>
                      <div className={styles.qtySelector}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={styles.qtyBtn}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className={styles.qtyInput}
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={styles.qtyBtn}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ fontWeight: 800, minWidth: '70px', textAlign: 'right' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={styles.removeBtn}
                        title="Remove Item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Card */}
              <div className={styles.cartSummaryCard}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  Order Summary
                </h3>
                
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

                {shippingCost > 0 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Add <span style={{ color: 'var(--primary)', fontWeight: 800 }}>${(100 - getCartTotal()).toFixed(2)}</span> more to qualify for Free Shipping!
                  </p>
                )}
                
                <div className={styles.summaryTotalRow}>
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>

                <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Proceed to Checkout
                </Link>

                <Link href="/shop" style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem', display: 'block' }}>
                  Continue Shopping
                </Link>
              </div>

            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
