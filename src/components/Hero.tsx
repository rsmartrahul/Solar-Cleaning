'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '@/styles/hero.module.css';

const slides = [
  {
    id: 1,
    badge: '☀️ Solar Cleaning Solutions',
    headline: 'Professional Solar Cleaning Solutions for Maximum Energy Efficiency',
    highlightWord: 'Efficiency',
    description: 'High-performance cleaning equipment, telescopic brushes, cleaning chemicals, and complete maintenance kits designed to maximize solar panel output.',
    cta1: { text: 'Shop Solar Products', href: '/?category=Solar Solutions' },
    cta2: { text: 'Request Bulk Quote', href: '#b2b-quote-form' },
    image: '/hero-solar.png',
    gradient: 'linear-gradient(135deg, #051433 0%, #0c2559 35%, #0a4a9c 70%, #195ac2 100%)',
  },
  {
    id: 2,
    badge: '🍄 Eco-Friendly Packaging',
    headline: '100% Sustainable Mushroom Packaging Solutions',
    highlightWord: 'Solutions',
    description: 'Biodegradable trays, punnets, produce bags, and eco-friendly packaging designed for farms, distributors, and food businesses.',
    cta1: { text: 'Explore Packaging', href: '/?category=Mushroom Packaging' },
    cta2: { text: 'Get Custom Pricing', href: '#b2b-quote-form' },
    image: '/hero-mushroom.png',
    gradient: 'linear-gradient(135deg, #091a08 0%, #133a10 35%, #256b21 70%, #54B304 100%)',
  },
  {
    id: 3,
    badge: '🌍 Unified Platform',
    headline: 'One Platform for Solar Maintenance & Sustainable Packaging',
    highlightWord: 'Packaging',
    description: 'Providing innovative solar cleaning equipment and environmentally responsible packaging solutions for modern businesses.',
    cta1: { text: 'Browse All Products', href: '/' },
    cta2: { text: 'Contact Sales Team', href: '#contact' },
    image: '/hero-combined.png',
    gradient: 'linear-gradient(135deg, #051433 0%, #0c2559 35%, #256b21 70%, #54B304 100%)',
  },
];

const stats = [
  { value: '500+', label: 'Business Clients', icon: '👥' },
  { value: '50+', label: 'Products', icon: '📦' },
  { value: '100%', label: 'Eco-Friendly', icon: '🌿' },
  { value: '24/7', label: 'Support', icon: '🎧' },
];

const trustBadges = [
  'Bulk Orders Available',
  'Eco-Friendly Products',
  'Secure Payments',
  'Fast Delivery',
  'Dedicated Support',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const renderHeadline = (headline: string, highlightWord: string) => {
    const parts = headline.split(highlightWord);
    return (
      <>
        {parts[0]}<span className={styles.headlineHighlight}>{highlightWord}</span>{parts[1] || ''}
      </>
    );
  };

  const activeSlide = slides[current];

  return (
    <section className={styles.heroSection}>
      {/* Carousel */}
      <div
        className={styles.carousel}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background gradient */}
        <div className={styles.carouselBg} style={{ background: activeSlide.gradient }} />

        {/* Slides */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${idx === current ? styles.slideActive : ''}`}
            style={{
              '--slide-highlight-gradient': slide.id === 1 
                ? 'linear-gradient(90deg, #38bdf8, #60a5fa)' 
                : slide.id === 2 
                  ? 'linear-gradient(90deg, #a7f3d0, #4ade80)' 
                  : 'linear-gradient(90deg, #fde047, #facc15)',
              '--slide-primary-color': slide.id === 1 
                ? '#0A4A9C' 
                : slide.id === 2 
                  ? '#54B304' 
                  : '#0A4A9C'
            } as React.CSSProperties}
          >
            <div className={styles.slideInner}>
              {/* Left content */}
              <div className={styles.slideContent}>
                <div className={styles.slideBadge}>{slide.badge}</div>
                <h1 className={styles.slideHeadline}>
                  {renderHeadline(slide.headline, slide.highlightWord)}
                </h1>
                <p className={styles.slideDescription}>{slide.description}</p>
                <div className={styles.slideCtas}>
                  <a href={slide.cta1.href} className={styles.ctaPrimary}>
                    {slide.cta1.text}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '8px' }}>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                  <a href={slide.cta2.href} className={styles.ctaOutline}>
                    {slide.cta2.text}
                  </a>
                </div>
              </div>

              {/* Right image */}
              <div className={styles.slideImageArea}>
                <div className={styles.slideImageWrapper}>
                  <img src={slide.image} alt={slide.badge} className={styles.slideImage} />
                </div>
                {/* Glassmorphism decorative element */}
                <div className={styles.glassCard} />
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button className={`${styles.navArrow} ${styles.navArrowLeft}`} onClick={prevSlide} aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={nextSlide} aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === current ? styles.dotActive : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
