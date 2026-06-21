'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

import BottomNav from '@/components/BottomNav';
import RequestQuoteForm from '@/components/RequestQuoteForm';
import styles from '@/styles/pages.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    sector: 'both',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        sector: 'both',
        message: ''
      });
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.layout}>
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        {/* ── Page Hero ── */}
        <section className={styles.pageHero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>Get In Touch</div>
            <h1 className={styles.heroTitle}>
              Contact Our <span>Enterprise</span> Team
            </h1>
            <p className={styles.heroSubtitle}>
              Have questions about solar panel cleaning systems or custom mycelium packaging orders? Get in touch with our Gujarat-based specialist team.
            </p>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.contactGrid}>
            
            {/* ── Left Column: Info & Map ── */}
            <div className={styles.contactLeft}>
              <div className={styles.contactCard}>
                <div className={styles.contactCardIcon}>📍</div>
                <div>
                  <h3 className={styles.contactCardTitle}>Business Address</h3>
                  <p className={styles.contactCardText}>
                    123 Green Energy Park,<br />
                    Surat, Gujarat – 395001, India
                  </p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactCardIcon}>📞</div>
                <div>
                  <h3 className={styles.contactCardTitle}>Phone Numbers</h3>
                  <p className={styles.contactCardText}>
                    Inquiries: <a href="tel:+919876543210">+91 98765 43210</a><br />
                    Office Desk: <a href="tel:+912611234567">+91 261 1234567</a>
                  </p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactCardIcon}>✉️</div>
                <div>
                  <h3 className={styles.contactCardTitle}>Email Addresses</h3>
                  <p className={styles.contactCardText}>
                    Support: <a href="mailto:support@solarcleanmycopack.com">support@solarcleanmycopack.com</a><br />
                    Sales Dept: <a href="mailto:sales@solarcleanmycopack.com">sales@solarcleanmycopack.com</a>
                  </p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactCardIcon}>🕐</div>
                <div>
                  <h3 className={styles.contactCardTitle}>Business Hours</h3>
                  <p className={styles.contactCardText}>
                    Monday – Saturday: 9:00 AM – 6:00 PM IST<br />
                    Sunday: Closed (Emergency Sales via Email)
                  </p>
                </div>
              </div>

              {/* Responsive Iframe Map */}
              <div className={styles.mapWrapper}>
                <iframe
                  title="Office Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14879.664426574744!2d72.82229625!3d21.1954536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  className={styles.mapFrame}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* ── Right Column: Form Card ── */}
            <div className={styles.contactRight}>
              {submitted ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>✓</div>
                  <h3 className={styles.successTitle}>Inquiry Sent</h3>
                  <p className={styles.successText}>
                    Thank you for contacting Solar & MycoPack. One of our Gujarat B2B account managers will respond to your business inquiry within 1 business day.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className={styles.formButton}
                    style={{ marginTop: '2rem' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.formIntro}>
                    <h2 className={styles.formIntroTitle}>Send Us a Message</h2>
                    <p className={styles.formIntroDesc}>
                      Fill out the form below and our team will get back to you with custom solutions tailored for your business needs.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="name">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={styles.inputField}
                          placeholder="Aarav Patel"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={styles.inputField}
                          placeholder="aarav@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={styles.inputField}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="company">Company Name</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className={styles.inputField}
                          placeholder="Patel Exports Ltd."
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="sector">Interested Business Sector *</label>
                      <select
                        id="sector"
                        name="sector"
                        value={formData.sector}
                        onChange={handleInputChange}
                        className={styles.inputField}
                        style={{ width: '100%' }}
                        required
                      >
                        <option value="solar">☀️ Solar Cleaning Equipment</option>
                        <option value="mushroom">🍄 Mushroom Mycelium Packaging</option>
                        <option value="both">🌿 Both Verticals (Unified Account)</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel} htmlFor="message">Your Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={styles.textareaField}
                        placeholder="Please details your inquiry here..."
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className={styles.formButton} 
                      disabled={submitting}
                    >
                      {submitting ? 'Sending inquiry...' : 'Send Message →'}
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>

        {/* ── B2B Bulk Quote Form section anchor ── */}
        <div id="b2b-quote-form" style={{ background: 'var(--bg-surface-elevated)', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Submit B2B Bulk Quote Request</h2>
            <RequestQuoteForm />
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
