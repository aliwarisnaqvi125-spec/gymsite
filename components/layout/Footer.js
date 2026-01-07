import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3 className={styles.logo}>ALEE'S <span className={styles.highlight}>GYM</span></h3>
                    <p className={styles.description}>
                        Experience the gold standard of fitness. Our luxury facility and elite training programs are designed to push you beyond your limits.
                    </p>
                    <div className={styles.socials}>
                        {/* Placeholder for icons */}
                        <span className={styles.socialIcon}>IG</span>
                        <span className={styles.socialIcon}>FB</span>
                        <span className={styles.socialIcon}>TW</span>
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.columnTitle}>Navigation</h4>
                    <ul className={styles.links}>
                        <li><Link href="/about">Our Story</Link></li>
                        <li><Link href="/equipment">The Facility</Link></li>
                        <li><Link href="/gallery">Lookbook</Link></li>
                        <li><Link href="/contact">Join the Elite</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.columnTitle}>Connect</h4>
                    <ul className={styles.contactInfo}>
                        <li>
                            <strong>Inquiries:</strong> <br />
                            <a href="mailto:aliwarisnaqvi125@gmail.com" className={styles.email}>aliwarisnaqvi125@gmail.com</a>
                        </li>
                        <li>
                            <strong>Visit Us:</strong> <br />
                            123 Fitness Street, <br /> Luxury District, GC
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.copyright}>
                <p>&copy; {currentYear} ALEE'S GYM. ALL RIGHTS RESERVED.</p>
            </div>
        </footer>
    );
}
