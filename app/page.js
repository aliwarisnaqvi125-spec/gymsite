import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/images/hero.png"
            alt="Gym Interior"
            fill
            className={styles.heroImage}
            priority
          />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.tagline}>Welcome to the Elite</p>
          <h1 className={styles.title}>FORGE YOUR <br /> LEGACY</h1>
          <p className={styles.subtitle}>
            Experience the ultimate fitness environment with state-of-the-art equipment and professional guidance.
          </p>
          <div className={styles.ctaGroup}>
            <Button href="/contact" variant="primary">Join Now</Button>
            <Button href="/about" variant="secondary">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="section container">
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Why Choose <span style={{ color: 'var(--color-primary)' }}>ALEE'S</span>
        </h2>

        <div className={styles.grid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Premium Equipment</h3>
            <p className={styles.featureText}>
              Train with the best using our wide range of high-end commercial machines and free weights.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Expert Trainers</h3>
            <p className={styles.featureText}>
              Get guidance from certified professionals dedicated to helping you achieve your fitness goals.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Modern Atmosphere</h3>
            <p className={styles.featureText}>
              Immerse yourself in a motivating environment designed to push your limits.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
