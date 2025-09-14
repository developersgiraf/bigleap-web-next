import Link from "next/link";
import styles from "./cta-button.module.scss";

export default function CTAButton({
  title = "Default Title",
  link = "#",
  isModal = false,
  modalTarget = "#",
}) {
  if (isModal) {
    return (
      <div className={styles.btn}>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target={modalTarget}
        >
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
