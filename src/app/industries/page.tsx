'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

import BottomNav from '@/components/BottomNav';
import styles from '@/styles/pages.module.css';

export default function IndustriesPage() {
  const industries = [
    {
      label: '☀️ Solar Cleaning',
      title: 'Solar Farm Developers & O&M Operators',
      desc: 'Utility-scale solar farms and commercial solar rooftop installations experience massive energy losses due to dust, bird droppings, and pollen. We provide high-durability telescoping water-fed brushes, eco-friendly solar-specific soaps, and autonomous robotic cleaning kits that increase energy production by up to 30%.',
      benefits: [
        'Boost power output and solar efficiency by 15% to 30%',
        'Extend panel lifespan with non-abrasive scratch-safe bristles',
        'Comply with strict environmental mandates using biodegradable chemicals'
      ],
      image: '/hero-solar.png',
      ctaShop: '/?category=Solar Solutions',
      ctaQuote: '/contact#b2b-quote-form'
    },
    {
      label: '🍄 Myco Packaging',
      title: 'Agricultural Growers & Food Exporters',
      desc: 'Export-oriented agricultural farms, organic growers, and delicate food businesses face pressure to eliminate plastic packaging. We offer custom-molded mycelium packaging punnets, berry trays, punnet dividers, and vegetable cartons grown from mushroom mycelium and agricultural crop waste.',
      benefits: [
        '100% home-compostable in 45 days (returns to the soil as nutrients)',
        'Excellent shock absorption and structural cushioning for fragile produce',
        'Thermally insulating material that keeps produce fresh during export'
      ],
      image: '/hero-mushroom.png',
      ctaShop: '/?category=Mushroom Packaging',
      ctaQuote: '/contact#b2b-quote-form'
    },
    {
      label: '📦 Packaging & Logistics',
      title: 'E-Commerce Retailers & Electronics Shippers',
      desc: 'Logistics hubs and high-volume e-commerce brands require high-performance corner protectors and edge buffers to safeguard electronics, cosmetics, and glassware. Our mycelium-based packaging blocks replace styrofoam/polystyrene, saving space and improving brand reputation.',
      benefits: [
        'Custom mold engineering tailored to fit electronics and glassware perfectly',
        'Lightweight composition that keeps shipping costs minimal',
        'Flame-retardant and moisture-resistant protective qualities'
      ],
      image: '/hero-combined.png',
      ctaShop: '/?category=Mushroom Packaging',
      ctaQuote: '/contact#b2b-quote-form'
    },
    {
      label: '🌿 Facility Maintenance',
      title: 'Industrial Facilities & Green Warehouses',
      desc: 'Modern factory complexes and LEED-certified green warehouses need to maintain massive rooftop solar arrays. We coordinate facility procurement accounts to deliver solar cleaning accessories, custom cleaning tools, and packaging supplies under single-contract B2B agreements.',
      benefits: [
        'Single-source B2B contract for both solar clean equipment and green packaging',
        'Autonomous cleaning robotics and remote water-fed systems support',
        'Detailed sustainability documentation indicating carbon footprint offsets'
      ],
      image: '/mushroom_carousel.png',
      ctaShop: '/',
      ctaQuote: '/contact#b2b-quote-form'
    }
  ];

  return (
    <div className={styles.layout}>
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        {/* ── Page Hero ── */}
        <section className={styles.pageHero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>Industries We Serve</div>
            <h1 className={styles.heroTitle}>
              Tailored <span>B2B</span> Solutions
            </h1>
            <p className={styles.heroSubtitle}>
              We empower clean energy providers, agricultural exporters, and shipping logistics hubs across India with industry-specific solar O&M tools and mycelium packaging.
            </p>
          </div>
        </section>

        {/* ── Page Intro ── */}
        <section className={styles.industriesIntro}>
          <p className={styles.industriesIntroText}>
            Every industry has unique environmental goals and operation standards. By offering specialized solar panel cleaning equipment and custom sustainable packaging grown from organic crop waste, we help businesses improve efficiency, reduce carbon footprints, and eliminate hazardous waste.
          </p>
        </section>

        {/* ── Industries Grid List ── */}
        <section className={styles.container}>
          <div className={styles.industriesGrid}>
            {industries.map((ind, idx) => (
              <div key={ind.title} className={styles.industryCard}>
                
                {/* Visual Image */}
                <div className={styles.industryVisual}>
                  <img src={ind.image} alt={ind.title} className={styles.industryImg} />
                </div>

                {/* Info Text */}
                <div className={styles.industryInfo}>
                  <span className={styles.industryLabel}>{ind.label}</span>
                  <h2 className={styles.industryTitle}>{ind.title}</h2>
                  <p className={styles.industryDesc}>{ind.desc}</p>
                  
                  <ul className={styles.industryBenefits}>
                    {ind.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className={styles.industryBenefitItem}>
                        <span className={styles.benefitIcon}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.industryActions}>
                    <Link href={ind.ctaShop} className={styles.industryBtnPrimary}>
                      🛒 Shop Solutions
                    </Link>
                    <Link href={ind.ctaQuote} className={styles.industryBtnOutline}>
                      📋 Request Quote →
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
