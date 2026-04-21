import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";

import { PT, ES, DE } from "country-flag-icons/react/3x2";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const flags = {
  Portugal: PT,
  Spain: ES,
  Germany: DE,
};

const formatDate = (date) => {
  if (!date) return "Invalid date";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(d);
};

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  if (isLoading || !currentCity) return <Spinner />; // ✅ MUST BE FIRST

  const { cityName, country, date, notes } = currentCity;

  const Flag = flags[country];

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {Flag && <Flag className={styles.flag} />} {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
