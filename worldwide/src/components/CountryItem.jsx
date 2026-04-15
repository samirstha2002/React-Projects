import styles from "./CountryItem.module.css";
import { PT, ES, DE } from "country-flag-icons/react/3x2";

function CountryItem({ country }) {
  const flags = {
    Portugal: PT,
    Spain: ES,
    Germany: DE,
  };

  const Flag = flags[country.country];

  return (
    <li className={styles.countryItem}>
      {Flag && <Flag className={styles.flag} />}
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
