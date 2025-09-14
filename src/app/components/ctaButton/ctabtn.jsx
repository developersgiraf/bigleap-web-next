import Link from "next/link";
import styles from "./cta-button.module.scss";

export default function CTAButton({
  title = "Default Title",
  link = "#",
  onClick = null,
  type = "button",
}) {
  if (onClick) {
    return (
      <div className={styles.btn}>
        <button type={type} onClick={onClick}>
          {title}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.btn}>
      <Link href={link}>{title}</Link>
    </div>
  );
}
