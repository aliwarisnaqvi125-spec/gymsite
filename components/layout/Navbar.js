'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Machines', href: '/equipment' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    ALEE'S <span className={styles.highlight}>GYM</span>
                </Link>

                <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ''}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.navBtn}>
                        <Button href="/contact" variant="primary">Join Now</Button>
                    </div>
                </div>

                <div className={styles.hamburger} onClick={toggleMenu}>
                    <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
                    <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
                    <div className={`${styles.bar} ${isOpen ? styles.open : ''}`}></div>
                </div>
            </div>
        </nav>
    );
}
