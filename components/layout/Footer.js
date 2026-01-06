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
                        The ultimate destination for fitness enthusiasts. High-end equipment, professional environment, and results-driven training.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4>Quick Links</h4>
                    <ul className={styles.links}>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/equipment">Machines</Link></li>
                        <li><Link href="/gallery">Gallery</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Contact Info</h4>
                    <ul className={styles.contactInfo}>
                        <li>
                            <strong>Email:</strong> <br />
                            <a href="mailto:aliwarisnaqvi125@gmail.com">aliwarisnaqvi125@gmail.com</a>
                        </li>
                        <li>
                            <strong>Location:</strong> <br />
                            123 Fitness Street, Gym City
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.copyright}>
                <p>&copy; {currentYear} ALEE'S GYM. All rights reserved.</p>
            </div>
        </footer>
    );
}
