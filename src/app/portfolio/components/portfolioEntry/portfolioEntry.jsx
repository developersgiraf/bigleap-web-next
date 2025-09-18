import Image from "next/image";
import styles from "./portfolioEntry.module.scss";
import ButtonCTA from "@/app/components/ctaButton/buttoncta";


export default function PortfolioEntry({ open = false, onButtonClick }) {
    const data = {
        title: "Animation",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/portfolio/portfolio1.png",
        readbtn: "Explore More"
    }
    
    return(
        <div className={`${open ? styles.open : styles.closed} ${styles.portfolioEntryWrapper}`}>
            <div className={styles["portfolio-entry"]}>
                <div className="container">
                    <div className={styles["fullContent"]}>
                        <div className={styles.content}>
                        <h3>{data.title}</h3>
                        <p>{data.description}</p>
                        <button>{data.readbtn}</button>
                        </div>
                        <Image src={data.image} alt={data.title} width={300} height={200} className={styles["portfolio-image"]} />
                    </div>
                    <div className={styles.buttonWrapper}>
                        <ButtonCTA title={'>'} onClick={onButtonClick} />
                    </div>

                </div>
            </div>
        </div>
    )
}