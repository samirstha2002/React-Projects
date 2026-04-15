import styles from "./CityItem.module.css";
import { PT, ES, DE } from "country-flag-icons/react/3x2";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, country, date } = city;

  const flags = {
    Portugal: PT,
    Spain: ES,
    Germany: DE,
  };

  const Flag = flags[country];

  return (
    <li className={styles.cityItem}>
      {Flag && <Flag className={styles.emoji} />}
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.data}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
