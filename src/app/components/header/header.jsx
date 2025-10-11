'use client';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function MainHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

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
                        <Link href="/">HOME</Link>
                    </li>
                    <li>
                        <Link href="/about">ABOUT US</Link>
                    </li>
                    <li  className={styles.dropdown}>
                        <Link href="/servicess" className={styles.dropbtn}>SERVICES
                        <i className={`fas fa-chevron-down ${styles.dropdownIcon}`}></i></Link>
                        <div className={styles.dropdownContent}>
                            <Link href="/servicess/web-design">Web Design</Link>
                            <Link href="/servicess/graphic-design">Graphic Design</Link>
                            <Link href="/servicess/video-editing-and-post-production">Video Editing</Link>
                            <Link href="/servicess/vfx-and-post-production">VFX & Post Production</Link>
                            <Link href="/servicess/character-design">Character Design</Link>
                            <Link href="/servicess/motion-graphics">Motion Graphics</Link>
                            <div className={styles.divider}></div>
                            <div className={styles.otherServicesContainer}>
                                <div className={styles.otherServicesItem}>
                                    <span className={styles.otherServicesLabel}>
                                        Other Services
                                        <i className={`fas fa-chevron-right ${styles.arrowIcon}`}></i>
                                    </span>
                                    <div className={styles.otherServicesContent}>
                                        <Link href="/servicess/twoDanimation">2D Animation</Link>
                                        <Link href="/servicess/threeDanimation">3D Animation</Link>
                                        <Link href="/servicess/whiteboard-animation">Whiteboard Animation</Link>
                                        <Link href="/servicess/product-animation">Product Animation</Link>
                                        <Link href="/servicess/storytelling">Storytelling</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link href="/portfolio" >PORTFOLIO </Link>
                    </li>
                    <li>
                        <Link href="/blog">BLOG</Link>
                    </li>
                    <li>
                        <Link href="/contact">CONTACT US</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}