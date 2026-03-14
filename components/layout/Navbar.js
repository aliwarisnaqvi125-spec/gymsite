'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tasks', label: 'Daily Tasks' },
    { href: '/tools', label: 'Life Tools' },
    { href: '/finance', label: 'Finance' },
    { href: '/blog', label: 'Tips & Tricks' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo} target="_blank" rel="noopener noreferrer">
                    <span className={styles.logoIcon}>✓</span>
                    Task<span className={styles.highlight}>Flow</span>
                    <span className={styles.logoBadge}>USA</span>
                </Link>

                <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ''}`}>
                    <ul className={styles.navLinks}>
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/tasks" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        Start Free →
                    </Link>
                </nav>

                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
                </button>
            </div>
        </header>
    );
}
