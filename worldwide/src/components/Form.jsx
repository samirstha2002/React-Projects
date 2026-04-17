// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import * as Flags from "country-flag-icons/react/3x2";

import styles from "./Form.module.css";
import Button from "./Button";

import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geocodeError, setGeoCodeError] = useState("");

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodeError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesnot seem to be city.Click somewhere else",
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setCountryCode(data.countryCode);
        } catch (error) {
          setGeoCodeError(error.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng],
  );

  if (isLoadingGeoCoding) return <Spinner />;

  if (geocodeError) return <Message message={geocodeError} />;

  const Flag = countryCode ? Flags[countryCode.toUpperCase()] : null;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>

        <div className={styles.inputWrapper}>
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />

          {Flag && <Flag className={styles.flag} />}
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
