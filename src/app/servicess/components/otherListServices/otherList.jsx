// "use client";
import styles from './otherList.module.css'
import Link from 'next/link';
// import {useState} from 'react';


export default function OtherListServices() {

    // const [isClosed, setIsClosed] = useState(true);

    // const toggleClass = () => {
    //     setIsClosed(!isClosed);
    // }
    const isClosed = true; // Replace with actual state management if needed

    return(
        <>
            <div className={`${styles.otherServices} ${isClosed ? styles.closed : ""}`}>
                <h3>Other Services</h3>
                <ul>
                    <li><Link href="/servicess/photography">Photography $ Videography</Link></li>
                    <li><Link href="/servicess/mobile-app">Mobile App Development</Link></li>
                    <li><Link href="/servicess/branding">Branding</Link></li>
                    <li><Link href="/servicess/digital-marketing">Digital Marketing</Link></li>
                    <li><Link href="/servicess/website-design">Website Designing $ Development</Link></li>
                    <li><Link href="/servicess/ecommerce">Ecommerce Web And App</Link></li>
                    <li><Link href="/servicess/ui-ux">UI $ UX Design</Link></li>

                </ul>

              {/* <div className={styles.otherbtn} onClick={toggleClass}>
                    <div>View Other Services</div>
                </div> */}
            </div>
        </>
)
}