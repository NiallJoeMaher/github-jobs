import styles from "./Card.module.css";

export default function Card({
  logo,
  createdAt,
  companyLogo,
  type,
  title,
  company,
  location,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={companyLogo} />
      </div>
      <div className={styles.info}>
        <p>{createdAt}</p>
        <p>•{type}</p>
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.info}>{company}</p>
      <h4>{location}</h4>
    </div>
  );
}
