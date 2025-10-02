'use client';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function MainHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

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
                aria-expanded={menuOpen}
                onClick={handleToggle}
                type="button"
            >
                {/* Hamburger icon */}
                <span style={{ display: 'block', width: 24, height: 2, background: '#ddd6cb', margin: '5px 0', borderRadius: 2 }}></span>
                <span style={{ display: 'block', width: 24, height: 2, background: '#ddd6cb', margin: '5px 0', borderRadius: 2 }}></span>
                <span style={{ display: 'block', width: 24, height: 2, background: '#ddd6cb', margin: '5px 0', borderRadius: 2 }}></span>
            </button>

            <nav className={menuOpen ? `${styles.nav} ${styles.open}` : styles.nav}>
                <ul onClick={closeMenu}>
                    <li>
                        <Link href="/">HOME</Link>
                    </li>
                    <li>
                        <Link href="/about">ABOUT US</Link>
                    </li>
                    <li>
                        <Link href="/servicess">SERVICES</Link>
                    </li>
                    <li>
                        <Link href="/portfolio">PORTFOLIO</Link>
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