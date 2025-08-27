
import styles from "./testimonials.module.scss";
export default function Testimonials() {
    return (
        <section className={styles.testimonials}>
            <h2>Testimonials</h2>
            <div>
                <p>"This company is amazing!" - Happy Client</p>
                <p>"I love their creative approach." - Satisfied Customer</p>
            </div>
        </section>
    );
}
