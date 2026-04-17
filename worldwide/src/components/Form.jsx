// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import Button from "./Button";

import "react-datepicker/dist/react-datepicker.css";

import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const { createCity, isLoading } = useCities();

  const navigate = useNavigate();

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geocodeError, setGeoCodeError] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      date,
      country,
      countryCode,
      notes,

      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }
  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by clicking on map" />;

  if (geocodeError) return <Message message={geocodeError} />;

  const Flag = countryCode ? Flags[countryCode.toUpperCase()] : null;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
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

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
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
