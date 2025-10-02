import styles from "./list.module.css";
export default function ListItem({listHead, listPara, title, description }) {
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 ">
      <div className={styles.listStyle}>
   
        <h2>{listHead}</h2>
        <p>{listPara}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );

}
