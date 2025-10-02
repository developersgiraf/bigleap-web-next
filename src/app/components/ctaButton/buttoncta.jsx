import styles from "./cta-button.module.css";

export default function ButtonCTA({
  title = "Default Title",
  onClick,
  onMouseEnter,
  onMouseLeave,
  type = "button",
  ...props
}) {
  return (
    <div className={styles.btn}>
      <button
        type={type}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {title}
      </button>
    </div>
  );
}
