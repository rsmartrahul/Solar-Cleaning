'use client';

import React, { useState } from 'react';
import styles from '@/styles/home.module.css';

const faqs = [
  {
    q: 'How often should solar panels be cleaned?',
    a: 'For optimal performance, solar arrays should be cleaned 1-2 times per year, or more frequently in dusty, arid, or agricultural areas to maintain maximum energy yield.'
  },
  {
    q: 'Are mushroom packaging products biodegradable?',
    a: 'Yes, 100%. Our MycoPack products are made from agricultural waste and mushroom mycelium. They are fully home-compostable and will break down in soil within 30-45 days.'
  },
  {
    q: 'Do you offer bulk order discounts?',
    a: 'Absolutely. We specialize in B2B commerce and offer tiered volume discounts for both our solar cleaning equipment and sustainable packaging. Please use the "Request Quote" form for custom pricing.'
  },
  {
    q: 'What locations do you ship to?',
    a: 'We ship globally to over 50 countries, utilizing a network of reliable freight forwarding partners for large palletized shipments.'
  },
  {
    q: 'Can businesses request custom packaging?',
    a: 'Yes. We can custom-grow mycelium packaging to perfectly fit your products profile, replacing styrofoam inserts entirely. Minimum order quantities apply for custom molds.'
  }
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`${styles.sectionPadding} ${styles.statsBg}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionSubtitle}>Everything you need to know about our products and services.</p>
        </div>

        <div className={styles.faqContainer}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={`${styles.faqItem} ${activeIndex === idx ? styles.active : ''}`}>
              <button className={styles.faqHeader} onClick={() => toggleFAQ(idx)}>
                {faq.q}
                <span className={styles.faqIcon}>+</span>
              </button>
              <div className={styles.faqContent}>
                <p className={styles.faqText}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
