'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer>

      {/* ── CTA BANNER ── */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerContent}>
          <div className={styles.ctaBannerLeft}>
            <div className={styles.ctaBannerIcon}>🌿</div>
            <h2 className={styles.ctaBannerTitle}>Ready to Scale Your Business?</h2>
            <p className={styles.ctaBannerDesc}>
              Explore professional solar cleaning solutions and sustainable<br />
              mushroom packaging products.
            </p>
          </div>
          <div className={styles.ctaBannerActions}>
            <Link href="/" className={styles.ctaBtnPrimary}>
              🛒 Shop Products &nbsp;→
            </Link>
            <Link href="/contact#b2b-quote-form" className={styles.ctaBtnOutline}>
              📋 Request Bulk Quote &nbsp;→
            </Link>
          </div>
        </div>
        {/* Background images (decorative) */}
        <div className={styles.ctaBannerImages}>
          <img src="/hero-solar.png" alt="" className={styles.ctaImgLeft} />
          <img src="/hero-mushroom.png" alt="" className={styles.ctaImgRight} />
        </div>
      </div>

      {/* ── MAIN FOOTER BODY ── */}
      <div className={styles.footerMain}>
        <div className={styles.footerGrid}>

          {/* Column 1 — Brand */}
          <div className={`${styles.footerCol} ${styles.footerBrandCol}`}>
            <div className={styles.footerLogo}>
              <img src="/logo.png" alt="Logo" className={styles.footerLogoImg} />
              <div>
                <div className={styles.footerLogoName}>Solar & <span>MycoPack</span></div>
                <div className={styles.footerLogoTagline}>Clean Energy. Green Future.</div>
              </div>
            </div>
            <p className={styles.footerBrandDesc}>
              Providing professional solar panel cleaning equipment and eco-friendly mushroom packaging solutions for businesses, farms, and industries.
            </p>
            <div className={styles.socialRow}>
              <a href="#" className={`${styles.socialBtn} ${styles.socialLi}`} title="LinkedIn">in</a>
              <a href="#" className={`${styles.socialBtn} ${styles.socialFb}`} title="Facebook">f</a>
              <a href="#" className={`${styles.socialBtn} ${styles.socialIg}`} title="Instagram">📷</a>
              <a href="#" className={`${styles.socialBtn} ${styles.socialYt}`} title="YouTube">▶</a>
              <a href="#" className={`${styles.socialBtn} ${styles.socialWa}`} title="WhatsApp">💬</a>
            </div>
          </div>

          {/* Column 2 — Solar Solutions */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>
              <span className={styles.colIcon}>☀️</span> Solar Solutions
            </h4>
            <ul className={styles.footerLinkList}>
              <li><Link href="/?category=Solar Solutions">Cleaning Chemicals <span>›</span></Link></li>
              <li><Link href="/?category=Solar Solutions">Solar Brushes <span>›</span></Link></li>
              <li><Link href="/?category=Solar Solutions">Solar Equipment <span>›</span></Link></li>
              <li><Link href="/?category=Solar Solutions">Cleaning Kits <span>›</span></Link></li>
              <li><Link href="/?category=Solar Solutions">Maintenance Tools <span>›</span></Link></li>
            </ul>
          </div>

          {/* Column 3 — Mushroom Packaging */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>
              <span className={styles.colIcon}>🍄</span> Mushroom Packaging
            </h4>
            <ul className={styles.footerLinkList}>
              <li><Link href="/?category=Mushroom Packaging">Mushroom Trays <span>›</span></Link></li>
              <li><Link href="/?category=Mushroom Packaging">Produce Bags <span>›</span></Link></li>
              <li><Link href="/?category=Mushroom Packaging">Punnets <span>›</span></Link></li>
              <li><Link href="/?category=Mushroom Packaging">Cartons <span>›</span></Link></li>
              <li><Link href="/?category=Mushroom Packaging">Custom Packaging <span>›</span></Link></li>
            </ul>
          </div>

          {/* Column 4 — Quick Links */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>
              <span className={styles.colIcon}>🔗</span> Quick Links
            </h4>
            <ul className={styles.footerLinkList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/">Products</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/contact#b2b-quote-form">Request Quote</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Column 5 — Support */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>
              <span className={styles.colIcon}>🛎️</span> Support
            </h4>
            <ul className={styles.footerLinkList}>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping Policy</Link></li>
              <li><Link href="/returns">Return Policy</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/help">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 6 — Contact */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>
              <span className={styles.colIcon}>📞</span> Contact Us
            </h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <div className={styles.contactLabel}>Business Address</div>
                  <div className={styles.contactValue}>123 Green Energy Park,<br />Surat, Gujarat – 395001, India</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <div className={styles.contactLabel}>Phone Number</div>
                  <div className={styles.contactValue}>+91 98765 43210</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <div>
                  <div className={styles.contactLabel}>Email Address</div>
                  <div className={styles.contactValue}>support@solarcleanmycopack.com</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🕐</span>
                <div>
                  <div className={styles.contactLabel}>Business Hours</div>
                  <div className={styles.contactValue}>Mon – Sat: 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



      {/* ── BOTTOM BAR ── */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <span>© 2026 Solar & MycoPack. All Rights Reserved.</span>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/privacy">Cookies Policy</Link>
          </div>
          <span className={styles.footerBottomRight}>🌿 Designed for Sustainable Business Growth 💚</span>
        </div>
      </div>

    </footer>
  );
}
