'use client';

import React from 'react';
import styles from '@/styles/home.module.css';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Procurement Head',
    company: 'IndoSolar Energy',
    stars: 5,
    text: 'The automated solar panel cleaning kits have improved our solar farm efficiency by 22%. Outstanding B2B support and fast delivery across India.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&q=80',
    verified: true
  },
  {
    name: 'Ananya Sharma',
    role: 'Operations Director',
    company: 'EcoFarm Agro Industries',
    stars: 5,
    text: 'MycoPack trays are the perfect sustainable solution. Our customers love the home-compostable packaging and it completely protects our mushrooms.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&q=80',
    verified: true
  },
  {
    name: 'Vikram Aditya',
    role: 'Founder',
    company: 'Apex CleanTech Corp',
    stars: 5,
    text: 'High-quality water-fed telescoping poles. The materials are durable, lightweight, and perfect for heavy commercial use. Highly recommended.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&q=80',
    verified: true
  },
  {
    name: 'Priya Nair',
    role: 'Supply Chain Manager',
    company: 'BioOrganics Logistics',
    stars: 5,
    text: 'Switching to mycelium packaging was the best branding decision we made. It eliminated styrofoam waste and customer feedback has been exceptional.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces&q=80',
    verified: true
  },
  {
    name: 'Sanjay Deshmukh',
    role: 'Maintenance Lead',
    company: 'Maharastra Solar Power',
    stars: 5,
    text: 'Excellent ROI on the robotic cleaning kits. We have seen a steady increase in power output and lower labor costs since deployment.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces&q=80',
    verified: true
  },
  {
    name: 'Meera Sen',
    role: 'Sustainability Head',
    company: 'GreenLine Packages',
    stars: 5,
    text: 'We order custom-molded biodegradable trays in bulk. The team is very responsive and the quality is consistently world-class.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&q=80',
    verified: true
  },
  {
    name: 'Arjun Singhal',
    role: 'VP Procurement',
    company: 'Renewable Power Ltd',
    stars: 5,
    text: 'The dedicated client support team went above and beyond to tailor custom cleaning tools to our exact site dimensions. A true B2B partner.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces&q=80',
    verified: true
  },
  {
    name: 'Kriti Kapoor',
    role: 'Quality Assurance',
    company: 'PureFresh Farms',
    stars: 5,
    text: 'These biodegradable boxes are sturdy and highly breathable, keeping our organic produce fresh while staying 100% plastic-free.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces&q=80',
    verified: true
  }
];

const clientLogos = [
  {
    name: 'Apex Solar',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
        <path d="M10 30 L25 10 L40 30 Z" fill="currentColor" opacity="0.25" />
        <path d="M20 30 L25 20 L30 30 Z" fill="currentColor" />
        <text x="48" y="22" fontFamily="var(--font-heading)" fontWeight="800" fontSize="11.5" fill="currentColor">APEX</text>
        <text x="48" y="30" fontFamily="var(--font-body)" fontWeight="600" fontSize="7" fill="currentColor" letterSpacing="0.08em">SOLAR</text>
      </svg>
    )
  },
  {
    name: 'BioPack',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <path d="M20 13 C23.5 16.5 23.5 23.5 20 27 C16.5 23.5 16.5 16.5 20 13 Z" fill="currentColor" />
        <text x="38" y="22" fontFamily="var(--font-heading)" fontWeight="800" fontSize="11.5" fill="currentColor">BIOPACK</text>
        <text x="38" y="30" fontFamily="var(--font-body)" fontWeight="600" fontSize="7" fill="currentColor" letterSpacing="0.08em">INDUSTRIES</text>
      </svg>
    )
  },
  {
    name: 'SolarGrid',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
        <rect x="10" y="12" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="14" y="16" width="8" height="8" fill="currentColor" opacity="0.6" />
        <text x="36" y="22" fontFamily="var(--font-heading)" fontWeight="800" fontSize="11" fill="currentColor">SOLARGRID</text>
        <text x="36" y="30" fontFamily="var(--font-body)" fontWeight="600" fontSize="7" fill="currentColor" letterSpacing="0.08em">TECHNOLOGY</text>
      </svg>
    )
  },
  {
    name: 'IndoCorp',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
        <polygon points="12,12 28,12 24,28 8,28" fill="currentColor" opacity="0.3" />
        <polygon points="16,16 32,16 28,32 12,32" fill="currentColor" />
        <text x="40" y="22" fontFamily="var(--font-heading)" fontWeight="800" fontSize="11.5" fill="currentColor">INDOCORP</text>
        <text x="40" y="30" fontFamily="var(--font-body)" fontWeight="600" fontSize="7" fill="currentColor" letterSpacing="0.08em">INDUSTRIES</text>
      </svg>
    )
  },
  {
    name: 'GreenGrid',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
        <path d="M10 26 C10 18 26 18 26 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="10" cy="26" r="3" fill="currentColor" />
        <circle cx="26" cy="10" r="3" fill="currentColor" />
        <text x="36" y="22" fontFamily="var(--font-heading)" fontWeight="800" fontSize="11.5" fill="currentColor">GREENGRID</text>
        <text x="36" y="30" fontFamily="var(--font-body)" fontWeight="600" fontSize="7" fill="currentColor" letterSpacing="0.08em">ENERGY</text>
      </svg>
    )
  },
  {
    name: 'Vikas Farms',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
        <path d="M10 28 V12 L18 19 L26 12 V28 H20 V20 L18 22 L16 20 V28 Z" fill="currentColor" />
        <text x="34" y="22" fontFamily="var(--font-heading)" fontWeight="800" fontSize="10.5" fill="currentColor">VIKAS FARMS</text>
        <text x="34" y="30" fontFamily="var(--font-body)" fontWeight="600" fontSize="7" fill="currentColor" letterSpacing="0.08em">ORGANIC PACK</text>
      </svg>
    )
  }
];

export default function Testimonials() {
  return (
    <section className={styles.sectionPadding}>
      <div className="container">
        
        {/* Section Heading & Subheading */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Trusted by Businesses Across India</h2>
          <p className={styles.sectionSubtitle}>
            See how companies are growing with our solar cleaning and sustainable packaging solutions.
          </p>
        </div>

        {/* Testimonials Auto-Scrolling Carousel */}
        <div className={styles.testimonialsMarquee}>
          <div className={styles.marqueeContent}>
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div key={idx} className={styles.testimonialCardModern}>
                {/* Large Background Quote Icon */}
                <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <div className={styles.testiHeader}>
                  <img src={t.avatar} alt={t.name} className={styles.testiAvatar} />
                  <div>
                    <div className={styles.testiName}>{t.name}</div>
                    <div className={styles.testiCompany}>
                      {t.role}, <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{t.company}</span>
                    </div>
                    {t.verified && (
                      <div className={styles.verifiedBadge}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.verifiedIcon}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Verified Buyer</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 5-star rating */}
                <div className={styles.testiStars}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className={styles.testiText}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos Auto-Scrolling Slider */}
        <div className={styles.logoSlider}>
          <div className={styles.logoSliderTrack}>
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
              <div key={idx} className={styles.logoWrapper} title={logo.name}>
                {logo.svg}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators Grid */}
        <div className={styles.trustIndicatorsGrid}>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>👥</div>
            <div className={styles.trustValue}>500+</div>
            <div className={styles.trustLabel}>Happy Clients</div>
          </div>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>📦</div>
            <div className={styles.trustValue}>1,200+</div>
            <div className={styles.trustLabel}>Successful Orders</div>
          </div>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>⭐</div>
            <div className={styles.trustValue}>98%</div>
            <div className={styles.trustLabel}>Customer Satisfaction</div>
          </div>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>🎧</div>
            <div className={styles.trustValue}>24/7</div>
            <div className={styles.trustLabel}>Dedicated Support</div>
          </div>
        </div>

      </div>
    </section>
  );
}
