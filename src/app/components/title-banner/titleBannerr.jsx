
import styles from './title.module.scss';
export default function TitleBanner({ title = "Default", sub="Sample" }) {
    return (
        <section className={styles['title-banner']}>
            <h1>{title}</h1>
            <p>{sub}</p>
        </section>
    );
}
