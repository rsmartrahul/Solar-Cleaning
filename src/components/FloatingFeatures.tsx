'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/home.module.css';

export default function FloatingFeatures() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.floatingFeatures}>

      <button className={`${styles.floatBtn} ${styles.whatsappBtn} ${styles.animatedWhatsapp}`} title="WhatsApp Support">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor" style={{ color: 'white' }}>
          <path d="M380.9 97.1C339-13 210.8-48 120.3 18.5c-90.6 66.5-122.9 203.2-62.7 303.5L20 480l162.5-46.1c100.3 61.2 236.9 28.9 303.5-62.7 66.5-90.5 31.5-218.7-105.1-274.1zM311.8 334.9c-5.9 16.7-26.6 31.9-40.3 34.6-44.9 9.2-67-9.2-96.9-40.8-9.7-9.9-25.7-30.8-28.5-48.5-2.2-13.9 5.1-31.2 16.5-37.6s31.3-13.4 39.6-14.7c2.3-.4 4.4-1.1 6.3-2.2 0 0 2.9-1.8 3.5-2.1c.9-.5.9-.4 2.3-.1 7.8 2.4 27.9 12.6 36.2 21.6 8.1 9 19.1 25.1 19.9 31.2.7 5.4-2.7 10-5.2 13.9l-6.9 9.8c-1.9 2.8-4.8 5.5-3.6 8.5 1.2 3 6.5 12.9 13.5 22.4 7 9.6 15.1 18.5 18.4 20.6 2.9 2 4.6 1.9 8.2 1 6.2-1.5 12.1-8.8 15-12.9l10.3-15c2.6-3.9 6.5-6.2 10.1-5.2 3.5 1 18.6 7.9 21.7 9.5 3 .5 6 .8 9 .5a30.5 30.5 0 0 0 13.8-7c2.9-2.9 5-6.2 6.5-9.7 1.1-2.6 6.1-16.8 5.1-31.2-1-14.3-9.3-28.1-12.8-34.6z" />
        </svg>
      </button>


      {showTop && (
        <button className={`${styles.floatBtn} ${styles.topBtn}`} title="Back To Top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}
