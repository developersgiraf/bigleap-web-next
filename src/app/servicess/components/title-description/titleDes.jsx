import styles from "./titledes.module.css";

export default function TitleDescription({ 
  title, 
  description, 
  subsections = [],
  // Legacy props for backward compatibility
  subhead1, subdes1, subhead2, subdes2, subhead3, subdes3, subhead4, subdes4 
}) {

  const titleSplit = title.includes("||") ? title.split("||") : null;

  // Use subsections if available, otherwise fall back to legacy format
  const sectionsToRender = subsections.length > 0 ? subsections : [
    ...(subhead1 && subdes1 ? [{ heading: subhead1, description: subdes1 }] : []),
    ...(subhead2 && subdes2 ? [{ heading: subhead2, description: subdes2 }] : []),
    ...(subhead3 && subdes3 ? [{ heading: subhead3, description: subdes3 }] : []),
    ...(subhead4 && subdes4 ? [{ heading: subhead4, description: subdes4 }] : [])
  ];

  return (
    <div className={styles.titleDescription}>
    <div className={styles.mainTitle}>
       {titleSplit && (
        <h2>{titleSplit.map((part, index) => (
           <span key={index} className={index % 2 === 0 ? styles.paraColor : styles.highlight}>{part}</span>
         ))}</h2>
       )}

      <p className={styles.description}>{description}</p>
      
      {/* Dynamic subsections rendering */}
      {sectionsToRender.map((section, index) => (
        <div key={index}>
          <h4 className={styles[`subhead${index + 1}`] || styles.subhead1}>{section.heading}</h4>
          <p className={styles[`subdes${index + 1}`] || styles.subdes1}>{section.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
