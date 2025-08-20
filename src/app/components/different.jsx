import styles from '../index.module.scss';
import Items from './item';
export default function Difference(){
    const list = [
        {
            title: 'Dynamic Team',
            sub: 'A dynamic team of experienced animators providing customized services to make your brand stand out.'
        },
        {
            title: 'Animation, VFX and more..',
            sub: 'Variety of animation services at your disposal 2D&3D animation videos, VFX, product explanatory videos, corporate videos, client testimonials and many more.'
        },
        {
            title: 'Custom solutions across industries',
            sub: 'We provide custom animation services across a wide range of industries including education, healthcare, marketing and many more.'
        },
        {
            title: 'Quality services',
            sub: 'Quality services that exceed the client’s expectations with a fast turnaround time.'
        }

    ];
    return (
        <>
            <section className={styles.test}>
                <div className="container">
                    <h2 className={styles.diff}>The Difference We Bring</h2>

                    <div className="row">
                        <div className={styles.all}>
                            {
                                list.map((item, idx) => (
                                    <Items key={idx} title={item.title} sub={item.sub}></Items>

                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}


