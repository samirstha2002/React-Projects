import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { getFlag } from "../utils/getFlag";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity } = useCities();
  const { cityName, country, countryCode, date, id, position } = city;

  const Flag = getFlag(countryCode);

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
