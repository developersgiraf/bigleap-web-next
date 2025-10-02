import styles from "./list.module.css";
import ListItem from "./listItems";
export default function ListServices({ listItems = [] }) {
  
  // Don't render the section if listItems is empty or undefined
  if (!listItems || listItems.length === 0) {
    return null;
  }
  
  return (
    <>
      <section className={styles.listSection}>
        <div className="container">
          <div className={`row ${styles.all}`}>
            {listItems.map((item, idx) => (
              <ListItem
                key={idx}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
