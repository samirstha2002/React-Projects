import styles from "./CountryItem.module.css";
import { getFlag } from "../utils/getFlag";

function CountryItem({ country }) {
  const Flag = getFlag(country.countryCode);

  return (
    <li className={styles.countryItem}>
      {Flag && <Flag className={styles.flag} />}
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
