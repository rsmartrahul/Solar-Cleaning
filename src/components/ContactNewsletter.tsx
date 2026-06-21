'use client';

import React from 'react';
import styles from '@/styles/home.module.css';

export default function ContactNewsletter() {
  return (
    <section className={`${styles.sectionPadding} ${styles.statsBg}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <p className={styles.sectionSubtitle}>We're here to help with your enterprise requirements.</p>
        </div>

        <div className={styles.contactGrid}>
          <div>
            <div className={styles.contactInfoCard}>
              <div className={styles.contactDetail}>
                <div className={styles.contactDetailIcon}>📍</div>
                <div className={styles.contactDetailText}>
                  <h4>Business Address</h4>
                  <p>123 Innovation Drive, Silicon Valley, CA 94025, USA</p>
                </div>
              </div>
              <div className={styles.contactDetail}>
                <div className={styles.contactDetailIcon}>📞</div>
                <div className={styles.contactDetailText}>
                  <h4>Phone Number</h4>
                  <p>+1 (800) 555-0199</p>
                </div>
              </div>
              <div className={styles.contactDetail}>
                <div className={styles.contactDetailIcon}>✉️</div>
                <div className={styles.contactDetailText}>
                  <h4>Email Address</h4>
                  <p>enterprise@solar-mycopack.com</p>
                </div>
              </div>
              <div className={styles.contactDetail}>
                <div className={styles.contactDetailIcon}>🕒</div>
                <div className={styles.contactDetailText}>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM (PST)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.mapContainer}>
            {/* Generic Placeholder Map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.63929062107!2d-122.08624618469247!3d37.422065579825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425def45%3A0x83f6285873487185!2sGoogleplex!5e0!3m2!1sen!2sus!4v1614815469900!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy"
              title="Office Location"
            ></iframe>
          </div>
        </div>

        <div className={styles.newsletterCard}>
          <h2 className={styles.newsletterTitle}>Stay Updated With Solar & Sustainable Packaging Innovations</h2>
          <p className={styles.newsletterDesc}>Join over 10,000+ business leaders receiving our monthly insights and exclusive offers.</p>
          <form className={styles.newsletterForm} onSubmit={e => { e.preventDefault(); alert('Subscribed!'); }}>
            <input type="email" placeholder="Enter your business email" required className={styles.newsletterInput} />
            <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}
