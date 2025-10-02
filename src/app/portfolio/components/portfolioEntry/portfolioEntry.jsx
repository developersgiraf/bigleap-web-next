import Image from "next/image";
import styles from "./portfolioEntry.module.css";
import ButtonCTA from "@/app/components/ctaButton/buttoncta";
import CTAButton from "@/app/components/ctaButton/ctabtn";


export default function PortfolioEntry({index = 0, open = false, onButtonClick, buttonTitle = '>', focusClass = '', data = [{
        title: "Animation",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/portfolio/portfolio1.png",
        readbtn: "Explore More",
        background: "linear-gradient(to bottom, #28002A, #000000)",
        link: "#"
    }] }) {

    const getFocusClassName = () => {
        if (focusClass === 'focused') return styles.focused;
        if (focusClass === 'unfocused') return styles.unfocused;

        return '';
    };
    
    return(
        <div className={`${open ? styles.open : styles.closed} ${styles.portfolioEntryWrapper} ${getFocusClassName()}`}>
            <div className={styles["portfolio-entry"]} style={{ backgroundImage: data[index].background }}>
                <div className="container">
                    <div className={styles["fullContent"]}>
                        <div className={styles.content}>
                        <h3>{data[index].title}</h3>
                        <p className={styles.description}>{data[index].description}</p>

                        <CTAButton title={data[index].readbtn} link={data[index].link} />
                        </div>

                        <Image src={data[index].image} alt={data[index].title} width={1024} height={1536} className={styles["portfolio-image"]} />
                    </div>

                </div>
            </div>
                    <div className={styles.buttonWrapper}>
                        <ButtonCTA title={buttonTitle} onClick={onButtonClick} />
                    </div>
        </div>
    )
}