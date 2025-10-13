'use client';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MainHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsClient(true);
        
        // Load Font Awesome for icons
        if (typeof window !== 'undefined') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(link);
        }
    }, []);

    const handleToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // Helper function to check if link is active
    const isActiveLink = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <header className={styles.header}>
        
            <Link href="/" className={styles.logo}>
                <Image src="/logo.png" alt="logo" width={74} height={87} className={styles.logoImage} />
            </Link>

                <button
                    className={styles['nav-toggle']}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isClient ? menuOpen : false}
                    onClick={handleToggle}
                    type="button"
                >
                    {/* Hamburger icon */}
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                </button>

                <nav className={isClient && menuOpen ? `${styles.nav} ${styles.open}` : styles.nav}>
                <ul onClick={closeMenu}>
                    <li>
                        <Link href="/" className={isActiveLink('/') ? styles.active : ''}>HOME</Link>
                    </li>
                    <li>
                        <Link href="/about" className={isActiveLink('/about') ? styles.active : ''}>ABOUT US</Link>
                    </li>
                    <li  className={styles.dropdown}>
                        <Link href="/servicess" className={`${styles.dropbtn} ${isActiveLink('/servicess') ? styles.active : ''}`}>SERVICES
                        <i className={styles.dropdownIcon}></i></Link>
                        <div className={styles.dropdownContent}>
                            <Link href="/servicess/product-animation">Product Animation</Link>
                            <Link href="/servicess/threeDanimation">3D Animation</Link>
                            <Link href="/servicess/twoDanimation">2D Animation</Link>
                            <Link href="/servicess/vfx-post-production">VFX & Post Production</Link>
                            <Link href="/servicess/motion-graphics">Motion Graphics</Link>
                            <Link href="/servicess/character-design">Character Design</Link>
                            <Link href="/servicess/storyboarding-design">Storyboarding</Link>
                            <Link href="/servicess/whiteboard-animation">Whiteboard Animation</Link>
                            <div className={styles.divider}></div>
                            <div className={styles.otherServicesContainer}>
                                <div className={styles.otherServicesItem}>
                                    <span className={styles.otherServicesLabel}>
                                        Other Services
                                        <i className={`fas fa-chevron-right ${styles.arrowIcon}`}></i>
                                    </span>
                                    <div className={styles.otherServicesContent}>
                                        <Link href="/servicess/mobile-app">Mobile App Development</Link>
                                        <Link href="/servicess/branding">Branding</Link>
                                        <Link href="/servicess/digital-marketing">Digital Marketing</Link>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link href="/portfolio" className={isActiveLink('/portfolio') ? styles.active : ''}>PORTFOLIO </Link>
                    </li>
                    <li>
                        <Link href="/blog" className={isActiveLink('/blog') ? styles.active : ''}>BLOG</Link>
                    </li>
                    <li>
                        <Link href="/contact" className={isActiveLink('/contact') ? styles.active : ''}>CONTACT US</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}