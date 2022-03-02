import React, { useState } from "react";
import usgsHandler from "../api/usgsHandler";
import photonHandler from "../api/photonHandler";

import styles from "./Home.module.css";

export default function Home() {
  const [allEarthquakes, setAllEarthquakes] = useState([]);
  const [location, setLocation] = useState("");
  const [suggestedLocations, setSuggestedLocations] = useState([]);

  const changeLocation = (loc) => {
    photonHandler
      .getSuggestedLocations(loc)
      .then((data) => {
        setSuggestedLocations(data.data.features);
      })
      .catch((error) => console.log(error));

    setLocation(loc);
  };

  const displayEarthquakes = (event) => {
    event.preventDefault();

    let lat = suggestedLocations[0].geometry.coordinates[1];
    let long = suggestedLocations[0].geometry.coordinates[0];

    usgsHandler
      .getListOfEarthquakes(lat, long)
      .then((data) => {
        setAllEarthquakes(data.data.features);
      })
      .catch((error) => console.log(error));
  };

  const clearInput = (event) => {
    event.preventDefault();
    setLocation("");
    setAllEarthquakes([]);
  };

  let nbOfEarthquakes = allEarthquakes.length;
  let sentence = `Between 2000 and 2022, ${nbOfEarthquakes} earthquake${
    nbOfEarthquakes > 0 ? "s" : ""
  } occured within a radius of 300 km around your place.`;

  const getDate = (iso) => {
    let date = new Date(iso);
    let formatedDate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    return formatedDate;
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Earthquakes Archive</h1>

      <div className={styles.appContainer}>
        <form className={styles.inputContainer}>
          <label className={styles.inputLabel}>Where do you live?</label>

          <div className={styles.inputs}>
            <input
              id="city"
              className={styles.inputField}
              type="text"
              value={location}
              placeholder={"Berlin, Germany"}
              onChange={(e) => {
                changeLocation(e.target.value);
              }}
            ></input>
            {location ? (
              <button className={styles.clearButton} onClick={clearInput}>
                Clear
              </button>
            ) : (
              ""
            )}
          </div>

          {/*  <datalist id="locations">
          {suggestedLocations &&
            suggestedLocations.map((loc) => {
              return (
                <option key={loc.properties.osm_id}>
                  {loc.name}, {loc.country}
                </option>
              );
            })}
        </datalist> */}

          <button
            className={styles.inputButton}
            type="submit"
            onClick={displayEarthquakes}
          >
            Search
          </button>
        </form>

        <div className={styles.sentenceContainer}>
          <p>{sentence}</p>
        </div>

        {allEarthquakes.length ? (
          <div className={styles.listContainer}>
            <p className={styles.listText}>Here are the 10 strongest ones:</p>
            {allEarthquakes
              .sort((a, b) => {
                let magA = a.properties.mag;
                let magB = b.properties.mag;

                return magB - magA;
              })
              .splice(0, 10)
              .map((event) => {
                return (
                  <div key={event.id} className={styles.listItem}>
                    <h2 className={styles.titleListItem}>
                      • {event.properties.place}
                    </h2>
                    <p className={styles.pListItem}>
                      Magnitude: {event.properties.mag} / 8
                    </p>
                    <p className={styles.pListItem}>
                      When? {getDate(event.properties.time)}
                    </p>
                  </div>
                );
              })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
