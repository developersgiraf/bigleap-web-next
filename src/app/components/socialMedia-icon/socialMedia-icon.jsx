import Link from "next/link";
import styles from "./icon.module.scss";
import Image from "next/image";

export default function SocialMediaIcon() {
    return(
        <>
        <div className={styles["social-media-icon"]}>
         <Link href="#"> 
         <Image
               src="/socialIcons/linkedin.png" alt="" width={21} height={21} className={styles.image}/></Link>
         <Link href="#"> <Image src="/socialIcons/facebook.png" alt="" width={21} height={21} className={styles.image}/></Link>
         <Link href="#"> <Image src="/socialIcons/instagram.png" alt="" width={21} height={21} className={styles.image}/></Link>
         <Link href="#"> <Image src="/socialIcons/youtube.png" alt="" width={21} height={21} className={styles.image}/></Link>


      </div>
        </>
    )
}