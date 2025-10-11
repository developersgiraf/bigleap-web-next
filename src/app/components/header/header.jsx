'use client';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Services data
const services = [
    { id: 'product-animation', title: 'Product Animation' },
    { id: 'threeDanimation', title: '3D Animation' },
    { id: 'twoDanimation', title: '2D Animation' },
    { id: 'vfx-and-post-production', title: 'VFX And Post Production' },
    { id: 'motion-graphics', title: 'Motion Graphics' },
    { id: 'video-editing-and-post-production', title: 'Video Editing And Post Production' },
    { id: 'character-design', title: 'Character Design' },
    { id: 'storytelling', title: 'Storytelling' },
    { id: 'whiteboard-animation', title: 'Whiteboard Animation' }
];

// Other services (can be customized as needed)
const otherServices = [
    { id: 'web-development', title: 'Web Development' },
    { id: 'mobile-app', title: 'Mobile App Development' },
    { id: 'ui-ux-design', title: 'UI/UX Design' },
    { id: 'digital-marketing', title: 'Digital Marketing' },
    { id: 'branding', title: 'Branding & Identity' }
];

export default function MainHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [otherServicesDropdownOpen, setOtherServicesDropdownOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setServicesDropdownOpen(false);
        setOtherServicesDropdownOpen(false);
    };

    const handleServicesHover = () => {
        setServicesDropdownOpen(true);
        setOtherServicesDropdownOpen(false);
    };

    const handleServicesLeave = () => {
        setServicesDropdownOpen(false);
        setOtherServicesDropdownOpen(false);
    };

    const handleOtherServicesHover = () => {
        setOtherServicesDropdownOpen(true);
    };

    const handleOtherServicesLeave = () => {
        setOtherServicesDropdownOpen(false);
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
                    <li 
                        className={styles.dropdown}
                        onMouseEnter={handleServicesHover}
                        onMouseLeave={handleServicesLeave}
                    >
                        <Link href="/servicess" className={styles.dropdownToggle}>
                            SERVICES
                            <span className={styles.dropdownArrow}>▼</span>
                        </Link>
                        {servicesDropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                <ul className={styles.dropdownList}>
                                    {services.map((service) => (
                                        <li key={service.id} className={styles.dropdownItem}>
                                            <Link href={`/servicess/${service.id}`}>
                                                {service.title}
                                            </Link>
                                        </li>
                                    ))}
                                    <li 
                                        className={`${styles.dropdownItem} ${styles.otherServicesItem}`}
                                        onMouseEnter={handleOtherServicesHover}
                                        onMouseLeave={handleOtherServicesLeave}
                                    >
                                        <span className={styles.otherServicesToggle}>
                                            Other Services
                                            <span className={styles.dropdownArrow}>▶</span>
                                        </span>
                                        {otherServicesDropdownOpen && (
                                            <div className={styles.subDropdownMenu}>
                                                <ul className={styles.subDropdownList}>
                                                    {otherServices.map((service) => (
                                                        <li key={service.id} className={styles.subDropdownItem}>
                                                            <Link href={`/servicess/${service.id}`}>
                                                                {service.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )}
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