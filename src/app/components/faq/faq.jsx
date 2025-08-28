"use client";

import { useState } from 'react';
import styles from './faq.module.scss';

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0); // First item open by default

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam',
            answer: 'Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque.'
        },
        {
            question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam',
            answer: 'Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque.'
        },
        {
            question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam',
            answer: 'Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque.'
        }
    ];

    return (
        <section className={styles.faqSection}>
            <div className='container'>
                <div className={styles.faqrow}>
                    <div className={styles.faqContent}>
                        <h2 className={styles.title}>Frequently Asked Questions</h2>
                    </div>
                    <div className={styles.faqList}>
                        {faqData.map((item, index) => (
                            <div key={index} className={styles.accordionItem}>
                                <div
                                    className={styles.accordionHeader}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className={styles.question}>{item.question}</span>
                                    <span className={styles.arrow}>
                                        {openIndex === index ? '▲' : '▼'}
                                    </span>
                                </div>
                                {openIndex === index && (
                                    <div className={styles.accordionContent}>
                                        <p>{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
