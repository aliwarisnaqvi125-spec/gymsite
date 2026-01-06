import styles from './page.module.css';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="section container">
            <div className={styles.aboutHeader}>
                <h1 className={styles.title}>About <span style={{ color: 'var(--color-primary)' }}>ALEE'S GYM</span></h1>
                <p className={styles.lead}>
                    More than just a gym. We are a community dedicated to strength, discipline, and progress.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.textBlock}>
                    <h2>Our Philosophy</h2>
                    <p>
                        At ALEE'S GYM, we believe that fitness is a journey, not a destination. Established with the vision of providing a world-class training facility, we have curated a space where beginners and pro athletes alike can push their limits.
                    </p>
                    <p>
                        Our facility is equipped with top-tier machinery, free weights, and functional training zones designed to cater to every workout style. Whether you are building muscle, losing weight, or training for performance, we provide the tools you need to succeed.
                    </p>
                </div>
                <div className={styles.imageBlock}>
                    {/* Placeholder for About Image - could reuse Hero or another if available */}
                    <div className={styles.placeholderImage}>
                        <span>Gym Interior Shot</span>
                    </div>
                </div>
            </div>

            <div className={styles.values}>
                <div className={styles.valueItem}>
                    <h3>Commitment</h3>
                    <p>We are committed to providing a clean, safe, and motivating environment.</p>
                </div>
                <div className={styles.valueItem}>
                    <h3>Excellence</h3>
                    <p>Only the best equipment and trainers make it into our facility.</p>
                </div>
                <div className={styles.valueItem}>
                    <h3>Community</h3>
                    <p>Join a supportive network of like-minded individuals.</p>
                </div>
            </div>
        </main>
    );
}
