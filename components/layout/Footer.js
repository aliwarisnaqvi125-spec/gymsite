import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = {
    'Productivity': [
        { label: 'Daily Tasks', href: '/tasks' },
        { label: 'Life Tools', href: '/tools' },
        { label: 'Habit Tracker', href: '/tools#habits' },
        { label: 'Goal Planner', href: '/tools#goals' },
    ],
    'Finance': [
        { label: 'Budget Calculator', href: '/finance' },
        { label: 'Tax Tips', href: '/finance#tax' },
        { label: 'Savings Goals', href: '/finance#savings' },
        { label: 'Credit Score', href: '/finance#credit' },
    ],
    'Resources': [
        { label: 'Tips & Tricks', href: '/blog' },
        { label: 'US Life Guides', href: '/blog#guides' },
        { label: 'Community', href: '/community' },
        { label: 'Newsletter', href: '/newsletter' },
    ],
};

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo} target="_blank" rel="noopener noreferrer">
                        <span className={styles.logoIcon}>✓</span>
                        Task<span className={styles.highlight}>Flow</span>
                        <span className={styles.logoBadge}>USA</span>
                    </Link>
                    <p className={styles.tagline}>
                        Your daily companion for productivity, finances, and American life.
                    </p>
                    <div className={styles.flags}>🇺🇸 Made for Americans</div>
                </div>

                {Object.entries(footerLinks).map(([section, links]) => (
                    <div key={section} className={styles.column}>
                        <h4 className={styles.columnTitle}>{section}</h4>
                        <ul className={styles.links}>
                            {links.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link} target="_blank" rel="noopener noreferrer">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <p className={styles.copyright}>© 2025 TaskFlow USA. All rights reserved.</p>
                    <div className={styles.legal}>
                        <Link href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                        <Link href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</Link>
                        <Link href="/advertise" target="_blank" rel="noopener noreferrer">Advertise</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
