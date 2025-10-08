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
    }, []);

    // Services data
    const mainServices = [
        { id: 'twoDanimation', title: '2D Animation' },
        { id: 'threeDanimation', title: '3D Animation' },
        { id: 'whiteboard-animation', title: 'Whiteboard Animation' },
        { id: 'motion-graphics', title: 'Motion Graphics' },
        { id: 'vfx-and-post-production', title: 'VFX And Post Production' },
        { id: 'product-animation', title: 'Product Animation' },
        { id: 'character-design', title: 'Character Design' },
        { id: 'storytelling', title: 'Storytelling' }
    ];

    const otherServices = [
        { id: 'video-editing-and-post-production', title: 'Video Editing And Post Production' },
        { id: 'web-development', title: 'Web Development' },
        { id: 'graphic-design', title: 'Graphic Design' },
        { id: 'digital-marketing', title: 'Digital Marketing' }
    ];

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
                     <li className={styles.servicesDropdown}>
                        <Link href="/servicess" className={styles.servicesLink}>SERVICES</Link>
                        <div className={styles.dropdownMenu}>
                            {mainServices.map((service) => (
                                <Link 
                                    key={service.id} 
                                    href={`/servicess/${service.id}`} 
                                    className={styles.dropdownItem}
                                >
                                    {service.title}
                                </Link>
                            ))}
                            <div className={styles.otherServicesContainer}>
                                <span className={styles.otherServicesLabel}>Other Services</span>
                                <div className={styles.otherServicesMenu}>
                                    {otherServices.map((service) => (
                                        <Link 
                                            key={service.id} 
                                            href={`/servicess/${service.id}`} 
                                            className={styles.dropdownItem}
                                        >
                                            {service.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
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