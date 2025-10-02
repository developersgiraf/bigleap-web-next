import styles from "./business.module.css";
export default function BusinessArea({ title, sub }) {
    return (
        <>
            <section className={styles.buscol}>
                <div className="container">
                    
                        <div className={styles.businessHead}>
                            <h5>{title}</h5>
                            <p className={styles.listcontent}>{sub}</p>
                        </div>
                </div>
            </section>
        </>

    );
}