'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '@/styles/home.module.css';

const stats = [
  { target: 5000, label: 'Orders Delivered', suffix: '+' },
  { target: 1000, label: 'Happy Customers', suffix: '+' },
  { target: 100, label: 'Business Clients', suffix: '+' },
  { target: 50, label: 'Cities Served', suffix: '+' }
];

export default function BusinessStats() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          stats.forEach((stat, index) => {
            const duration = 2000;
            const steps = 60;
            const stepTime = Math.abs(Math.floor(duration / steps));
            let current = 0;
            
            const timer = setInterval(() => {
              current += Math.ceil(stat.target / steps);
              if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = current;
                return newCounts;
              });
            }, stepTime);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className={`${styles.sectionPadding} ${styles.statsBg}`}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <div className={styles.statNumber}>
                {counts[idx]}{stat.suffix}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
