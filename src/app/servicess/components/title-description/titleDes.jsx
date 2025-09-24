import styles from "./titledes.module.scss";

export default function TitleDescription({ title, description, subhead1, subdes1,
subhead2, subdes2,subhead3, subdes3, subhead4, subdes4 }) {

  const titleSplit = title.includes("{{") ? title.split("{{") : null;
  const titleWhite = titleSplit[0];
  const titleHighlight = titleSplit[1] ? titleSplit[1].split("}}")[0] : null;
  const titleEnds = titleHighlight ? titleSplit[1].split("}}") : null;
  const titleEnd = titleEnds ? titleEnds[1] : null;
  return (
    <div className={styles.titleDescription}>
      <h2 className={styles.paraColor}>{titleWhite}</h2>
      {titleHighlight && <span className={styles.highlight}>{titleHighlight}</span>}
      {titleEnd && <span className={styles.paraColor}>{titleEnd}</span>}
      <p className={styles.description}>{description}</p>
      <h4 className={styles.subhead1}>{subhead1}</h4>
      <p className={styles.subdes1}>{subdes1}</p>
     <h4 className={styles.subhead2}>{subhead2}</h4>
      <p className={styles.subdes2}>{subdes2}</p>
      <h4 className={styles.subhead3}>{subhead3}</h4>
      <p className={styles.subdes3}>{subdes3}</p>
      <h4 className={styles.subhead4}>{subhead4}</h4>
      <p className={styles.subdes4}>{subdes4}</p>
    </div>
  );
}
