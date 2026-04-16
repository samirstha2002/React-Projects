import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { PT, ES, DE } from "country-flag-icons/react/3x2";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity } = useCities();
  const { cityName, country, date, id, position } = city;

  const flags = {
    Portugal: PT,
    Spain: ES,
    Germany: DE,
  };

  const Flag = flags[country];

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
      >
        {Flag && <Flag className={styles.emoji} />}
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.data}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
