import styles from './blog.module.scss';

export default function BlogStyle({ image, title, date, about }) {

    return (
        <div className='col-xl-4'>
            <div className={styles.blog}>
                <img src={image} alt={image} />
                <h6>{title}</h6>
                <p>{date}</p>
                <p>{about}</p>
            </div>
        </div>
    )
}