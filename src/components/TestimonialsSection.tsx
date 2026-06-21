// src/components/TestimonialsSection.tsx
import React, { useState } from 'react';
import styles from '@/styles/testimonialsSection.module.css';

// Placeholder data – replace with real content / CMS integration
const testimonials = [
  {
    name: 'Anjali Mehta',
    role: 'Operations Manager, SolarTech India',
    company: 'SolarTech',
    rating: 5,
    review: "The cleaning equipment boosted our productivity by 30% and the eco‑friendly packaging reduced waste dramatically.",
    avatar: '/profile_placeholder_1782066946763.png', // generated placeholder image
    companyLogo: '/logo_solartech.png',
  },
  {
    name: 'Rohit Sharma',
    role: 'CTO, GreenPack Solutions',
    company: 'GreenPack',
    rating: 5,
    review: "Switching to sustainable packaging cut our carbon footprint in half while keeping customers delighted.",
    avatar: '/profile_placeholder_1782066946763.png',
    companyLogo: '/logo_greenpack.png',
  },
  {
    name: 'Sneha Kapoor',
    role: 'Head of Operations, SunClean Ltd.',
    company: 'SunClean',
    rating: 5,
    review: "The reliability of the solar cleaning kits has saved us countless hours of manual labor.",
    avatar: '/profile_placeholder_1782066946763.png',
    companyLogo: '/logo_sunclean.png',
  },
  {
    name: 'Vikram Singh',
    role: 'Procurement Lead, EcoWare',
    company: 'EcoWare',
    rating: 5,
    review: "Our partnership has been a game‑changer for scaling sustainable packaging across 200+ SKUs.",
    avatar: '/profile_placeholder_1782066946763.png',
    companyLogo: '/logo_ecoware.png',
  },
  {
    name: 'Priya Patel',
    role: 'Founder, BrightSolar',
    company: 'BrightSolar',
    rating: 5,
    review: "The seamless integration with our ERP made onboarding a breeze and increased order speed.",
    avatar: '/profile_placeholder_1782066946763.png',
    companyLogo: '/logo_brightsolar.png',
  },
];

const stats = [
  { icon: '👥', label: '5000+', description: 'Happy Clients' },
  { icon: '📦', label: '1200+', description: 'Orders Delivered' },
  { icon: '👍', label: '98%', description: 'Customer Satisfaction' },
  { icon: '🕒', label: '24/7', description: 'Dedicated Support' },
];

const trustedLogos = [
  '/logo_solartech.png',
  '/logo_greenpack.png',
  '/logo_sunclean.png',
  '/logo_ecoware.png',
  '/logo_brightsolar.png',
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  // Compute the three visible indexes (center, left, right)
  const getIndexes = () => {
    const center = current;
    const left = (current - 1 + testimonials.length) % testimonials.length;
    const right = (current + 1) % testimonials.length;
    return [left, center, right];
  };

  const visible = getIndexes();

  return (
    <section className={styles.testimonialsSection}>
      {/* Badge & Heading */}
      <div className={styles.header}> 
        <span className={styles.badge}>CUSTOMER TESTIMONIALS</span>
        <h2 className={styles.title}>Trusted by Businesses Across India</h2>
        <p className={styles.subtitle}>
          Our clients experience measurable growth, reduced waste, and a reliable partner for solar cleaning and sustainable packaging.
        </p>
      </div>

      {/* Carousel */}
      <div className={styles.carouselWrapper}>
        <button className={styles.navButton} onClick={prev} aria-label="Previous testimonial">
          ◀
        </button>
        <div className={styles.carousel}>
          {visible.map((idx) => {
            const item = testimonials[idx];
            const isCenter = idx === current;
            return (
              <div
                key={idx}
                className={`${styles.card} ${isCenter ? styles.centerCard : styles.sideCard}`}
              >
                <div className={styles.quoteIcon}>❝</div>
                <div className={styles.rating}>★ ★ ★ ★ ★</div>
                <p className={styles.review}>"{item.review}"</p>
                <div className={styles.profile}>
                  <img src={item.avatar} alt={`${item.name} avatar`} className={styles.avatar} />
                  <div>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.role}>{item.role}</p>
                  </div>
                </div>
                <div className={styles.verifiedBadge}>✔ Verified Buyer</div>
                <img src={item.companyLogo} alt={item.company} className={styles.companyLogo} />
              </div>
            );
          })}
        </div>
        <button className={styles.navButton} onClick={next} aria-label="Next testimonial">
          ▶
        </button>
      </div>

      {/* Pagination Dots */}
      <div className={styles.pagination}>
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      {/* Business Trust Stats */}
      <div className={styles.stats}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>
            <p className={styles.statLabel}>{s.label}</p>
            <p className={styles.statDesc}>{s.description}</p>
          </div>
        ))}
      </div>

      {/* Trusted Companies */}
      <div className={styles.trustedCompanies}>
        <h3 className={styles.trustedTitle}>Trusted By Leading Companies</h3>
        <div className={styles.logoRow}>
          {trustedLogos.map((src, i) => (
            <img key={i} src={src} alt={`Company ${i + 1}`} className={styles.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
