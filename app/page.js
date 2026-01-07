'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import StatCounter from '@/components/features/StatCounter';
import ServiceCard from '@/components/features/ServiceCard';
import styles from './page.module.css';

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroImage = document.querySelector(`.${styles.heroImage}`);

      if (heroImage) {
        // Parallax effect: move image slower than scroll
        const parallaxSpeed = 0.5;
        heroImage.style.transform = `scale(1.1) translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/images/hero_gym_8k.png"
            alt="Gym Interior"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={`${styles.heroContent} animate-fade-in`}>
          <span className={styles.tagline}>The Gold Standard of Fitness</span>
          <h1 className={styles.title}>
            <span className={styles.titleWord1}>Transform</span>{' '}
            <span className={styles.titleWord2}>Your <span className="red-text">Body</span>.</span>
            <br />
            <span className={styles.titleWord3}>Build Your <span className="silver-text">Strength</span>.</span>
          </h1>
          <p className={styles.subtitle}>
            Experience elite training with state-of-the-art 8K equipment and world-class expert trainers in a premium luxury environment.
          </p>
          <div className={styles.ctaGroup}>
            <Button href="/contact" variant="primary">Join the Elite</Button>
            <Button href="/gallery" variant="secondary">Explore Gallery</Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <StatCounter end={1500} label="Active Members" />
            <StatCounter end={50} label="Expert Trainers" />
            <StatCounter end={120} label="Premium Machines" />
            <StatCounter end={10} label="Years Excellence" />
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="section container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our <span className="red-text">Services</span></h2>
          <p className={styles.sectionSubtitle}>Tailored programs for every fitness level.</p>
        </div>

        <div className={styles.servicesGrid}>
          <ServiceCard
            title="Weight Training"
            description="Access our massive collection of premium free weights and mechanical machines."
            image="/images/weight_training.png"
          />
          <ServiceCard
            title="Cardio Mastery"
            description="High-performance treadmills, ellipticals, and rowers with interactive displays."
            image="/images/cardio_machines.png"
          />
          <ServiceCard
            title="Personal Coaching"
            description="One-on-one sessions with certified elite trainers to reach your specific goals."
            image="/images/hero_gym_8k.png"
          />
        </div>
      </section>
    </main>
  );
}
