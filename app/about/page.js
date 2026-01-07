import styles from './page.module.css';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="section container animate-fade-in">
            <div className={styles.aboutHeader}>
                <span className={styles.tagline}>Since 2014</span>
                <h1 className={styles.title}>The <span className="red-text">ALEE'S</span> Story</h1>
                <p className={styles.lead}>
                    Defining the pinnacle of luxury fitness and elite performance in the heart of the city.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.textBlock}>
                    <h2 className={styles.sectionTitle}>Elite Philosophy</h2>
                    <p>
                        At ALEE'S GYM, we don't just provide equipment; we provide an environment where evolution is inevitable. Founded on the principles of discipline and aesthetic excellence, our facility serves as a sanctuary for those who demand more from themselves.
                    </p>
                    <p>
                        Our space is meticulously curated with the world's most advanced training technology, from bio-mechanically optimized machines to artisanal free weights. Here, every rep counts, and every detail matters.
                    </p>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/hero_gym_8k.png"
                            alt="Luxury Gym Interior"
                            fill
                            className={styles.image}
                        />
                        <div className={styles.imageOverlay}></div>
                    </div>
                </div>
            </div>

            <div className={styles.values}>
                <div className={styles.valueItem}>
                    <div className={styles.valueNumber}>01</div>
                    <h3 className={styles.valueTitle}>Precision</h3>
                    <p>Every piece of equipment is calibrated for maximum results and safety.</p>
                </div>
                <div className={styles.valueItem}>
                    <div className={styles.valueNumber}>02</div>
                    <h3 className={styles.valueTitle}>Exclusivity</h3>
                    <p>A focused environment designed for serious athletes and transformation.</p>
                </div>
                <div className={styles.valueItem}>
                    <div className={styles.valueNumber}>03</div>
                    <h3 className={styles.valueTitle}>Excellence</h3>
                    <p>Our trainers are international gold-standard certified professionals.</p>
                </div>
            </div>
        </main>
    );
}

