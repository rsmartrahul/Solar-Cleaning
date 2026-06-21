'use client';

import React, { useState } from 'react';
import styles from '@/styles/home.module.css';

export default function RequestQuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    productRequirement: '',
    quantity: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', companyName: '', email: '', phone: '', productRequirement: '', quantity: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.sectionPadding}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Request Custom Pricing</h2>
          <p className={styles.sectionSubtitle}>Get a tailored B2B quote for your enterprise needs.</p>
        </div>

        <div className={styles.quoteContainer}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Quote Request Sent!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Our B2B sales team will contact you within 24 hours.</p>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setSuccess(false)} style={{ marginTop: '2rem' }}>
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.quoteFormGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name</label>
                <input required type="text" className={styles.formInput} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Company Name</label>
                <input required type="text" className={styles.formInput} value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} placeholder="Acme Corp" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address</label>
                <input required type="email" className={styles.formInput} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@company.com" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number</label>
                <input required type="tel" className={styles.formInput} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product Requirement</label>
                <input required type="text" className={styles.formInput} value={formData.productRequirement} onChange={e => setFormData({...formData, productRequirement: e.target.value})} placeholder="e.g. MycoPack Trays" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Estimated Quantity</label>
                <input required type="number" className={styles.formInput} value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} placeholder="e.g. 5000" />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.formLabel}>Additional Message</label>
                <textarea className={styles.formTextarea} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Tell us more about your requirements..."></textarea>
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.submitBtn}`} disabled={loading}>
                  {loading ? 'Submitting...' : 'Get Custom Pricing'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
