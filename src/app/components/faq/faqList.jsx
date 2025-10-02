import styles from './faq.module.css';

export default function FaqList({ title, sub }) {
    return (
        <>
            <section className={styles.faqlist}>
                <div id="accordion">
                    <div className={styles.accordion}>
                        <input type="radio" name="radacc" className={styles['accordian-chk']} checked />
                        <h3 className={styles['accordian-header']}>
                            <span className={styles.h5}>{title}</span>
                            <span className={styles['acc-icon']}></span>
                        </h3>
                        <div className={styles['accordian-content']} tabindex="2">
                            <p>
                                <span className={styles.p}>{sub}</span>

                            </p>
                        </div>
                    </div>
                </div>
        </section >
        </>
    )
}