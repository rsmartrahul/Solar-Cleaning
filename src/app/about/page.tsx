'use client';

import React from 'react';
import Navbar from '@/components/Navbar';

import BottomNav from '@/components/BottomNav';
import WhyChooseUs from '@/components/WhyChooseUs';
import styles from '@/styles/pages.module.css';

export default function AboutPage() {
  const coreValues = [
    {
      icon: '🌿',
      title: 'Sustainability',
      text: 'Creating home-compostable packaging using organic mycelium to entirely eliminate single-use plastics from shipping chains.'
    },
    {
      icon: '☀️',
      title: 'Clean Energy',
      text: 'Developing advanced solar panel maintenance equipment to ensure green energy installations operate at full efficiency.'
    },
    {
      icon: '⚙️',
      title: 'Innovation',
      text: 'Pioneering agricultural science and engineering solutions to combine high-performance capabilities with green ethics.'
    },
    {
      icon: '🤝',
      title: 'Partnership',
      text: 'Supporting B2B business customers with custom scaling, bulk logistics, and dedicated account support across India.'
    }
  ];

  const timelineItems = [
    {
      year: '2021',
      title: 'Company Foundation',
      text: 'Established in Surat, Gujarat with the goal of designing efficient, clean solar panel maintenance equipment for industrial solar farms.'
    },
    {
      year: '2023',
      title: 'Eco-Packaging Expansion',
      text: 'Launched the MycoPack division to grow biodegradable protective packaging from agricultural waste and organic mushroom mycelium.'
    },
    {
      year: '2024',
      title: 'Enterprise Scalability',
      text: 'Designed custom Punnet and Box Tray molds for massive food exporters and shipping distributors, replacing tons of Styrofoam.'
    },
    {
      year: '2026',
      title: 'Unified Solar Clean & MycoPack Portal',
      text: 'Launched our modern enterprise B2B platform to serve clean energy O&M logistics and packaging supply demands from one unified workspace.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Aarav Mehta',
      role: 'Chief Executive Officer',
      bio: 'Leading sustainable engineering developments with over 15 years of experience in solar grid O&M systems and green supply chains.',
      badge: 'Founder',
      image: '/hero-combined.png' // Uses existing hero asset dynamically
    },
    {
      name: 'Sarah D\'Souza',
      role: 'Head of Mycelium Design',
      bio: 'Pioneering organic mycelium agricultural processing. Sarah designs our custom B2B packaging molds to ensure maximum fragility protection.',
      badge: 'Bio-Scientist',
      image: '/hero-mushroom.png'
    },
    {
      name: 'Rohan Sharma',
      role: 'Director of Solar Tech',
      bio: 'Rohan leads engineering for telescoping water-fed brushes and robotics, ensuring solar installations achieve peak power output.',
      badge: 'Lead Engineer',
      image: '/hero-solar.png'
    }
  ];

  return (
    <div className={styles.layout}>
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        {/* ── Page Hero ── */}
        <section className={styles.pageHero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>About Our Enterprise</div>
            <h1 className={styles.heroTitle}>
              Pioneering <span>Sustainable</span> Solutions
            </h1>
            <p className={styles.heroSubtitle}>
              We provide professional solar panel maintenance equipment to maximize green energy output and organic mushroom mycelium packaging to eliminate shipping waste.
            </p>
          </div>
        </section>

        <div className={styles.container}>
          {/* ── Mission & Vision ── */}
          <section className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>☀️</div>
              <h3 className={styles.missionTitle}>Our Mission</h3>
              <p className={styles.missionText}>
                To empower commercial enterprises, agricultural growers, and industrial solar installations with the tools and materials required for clean, green, and high-efficiency operations. We believe in replacing chemical-laden, high-waste methods with clean solar solutions and circular, compostable packaging.
              </p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>🍄</div>
              <h3 className={styles.missionTitle}>Our Vision</h3>
              <p className={styles.missionText}>
                To accelerate the transition to absolute carbon-neutral logistics and maximum renewable energy generation. By proving that organic mycelium is stronger than polystyrene and solar maintenance increases output by up to 30%, we aim to make sustainability the most profitable choice for modern business.
              </p>
            </div>
          </section>
        </div>

        {/* ── Timeline Section ── */}
        <section className={styles.timelineSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Journey</h2>
            <div className={styles.timeline}>
              {timelineItems.map((item, idx) => (
                <div
                  key={item.year}
                  className={`${styles.timelineItem} ${
                    idx % 2 === 0 ? styles.timelineItemLeft : styles.timelineItemRight
                  }`}
                >
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineText}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.container}>
          {/* ── Core Values ── */}
          <section style={{ marginBottom: '6rem' }}>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <div className={styles.valuesGrid}>
              {coreValues.map((val) => (
                <div key={val.title} className={styles.valueCard}>
                  <div className={styles.valueIcon}>{val.icon}</div>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p className={styles.valueText}>{val.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Leadership Team ── */}
          <section style={{ marginBottom: '6rem' }}>
            <h2 className={styles.sectionTitle}>Leadership Team</h2>
            <div className={styles.teamGrid}>
              {teamMembers.map((member) => (
                <div key={member.name} className={styles.teamCard}>
                  <div className={styles.teamImageWrapper}>
                    <img src={member.image} alt={member.name} className={styles.teamImage} />
                    <span className={styles.teamBadge}>{member.badge}</span>
                  </div>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <div className={styles.teamRole}>{member.role}</div>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Why Choose Us integration ── */}
        <WhyChooseUs />
      </main>

      <BottomNav />
    </div>
  );
}
