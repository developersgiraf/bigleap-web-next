import styles from "./list.module.scss";
import ListItem from "./listItems";
export default function ListServices() {
  const list = [
    {
      title: "Ut enim ad minim.Adipiscing",
      description:
        "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      title: "Ut enim ad minim.Adipiscing",
      description:
        "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      title: "Ut enim ad minim.Adipiscing",
      description:
        "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      title: "Ut enim ad minim.Adipiscing",
      description:
        "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      title: "Ut enim ad minim.Adipiscing",
      description:
        "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      title: "Ut enim ad minim.Adipiscing",
      description:
        "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.Adipiscing elit, sed do eiusmod tempor incididunt",
    },
  ];
  return (
    <>
      <section className={styles.listSection}>
        <div className="container">
          <div className={`row ${styles.all}`}>
            {list.map((item, idx) => (
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
