import React, { useState } from "react";
import usgsHandler from "../api/usgsHandler";
import photonHandler from "../api/photonHandler";

import styles from "./Home.module.css";

export default function Home() {
  const [allEarthquakes, setAllEarthquakes] = useState([]);
  const [location, setLocation] = useState("");
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [status, setStatus] = useState("");

  const updateLocation = (loc) => {
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
    setStatus("Loading..");

    let lat = suggestedLocations[0].geometry.coordinates[1];
    let long = suggestedLocations[0].geometry.coordinates[0];

    usgsHandler
      .getListOfEarthquakes(lat, long)
      .then((data) => {
        setAllEarthquakes(data);
        if (data.length === 0) {
          setStatus("No earthquake found.");
        }
      })
      .catch((error) => console.log(error));
  };

  // To format the ISO date
  const getDate = (iso) => {
    let date = new Date(iso);
    let formatedDate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    return formatedDate;
  };

  // To clear the input before searching for a new place
  const clearInput = (event) => {
    event.preventDefault();
    setLocation("");
    setAllEarthquakes([]);
    setStatus("");
  };

  let nbOfEarthquakes = allEarthquakes.length;
  let yourPlace = `${
    nbOfEarthquakes > 0 && suggestedLocations[0]
      ? suggestedLocations[0].properties.name +
        ", " +
        suggestedLocations[0].properties.country
      : "your place"
  }`;

  let sentence = `Between 2000 and 2022, ${nbOfEarthquakes} earthquake${
    nbOfEarthquakes > 0 ? "s" : ""
  } occured within a radius of 200 km around ${yourPlace}.`;

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Earthquakes Archive</h1>

      <div className={styles.appContainer}>
        <form className={styles.inputContainer}>
          <label className={styles.inputLabel}>Where do you live?</label>

          <div>
            <input
              className={styles.inputField}
              type="text"
              value={location}
              placeholder={"Berlin, Germany"}
              onChange={(e) => {
                updateLocation(e.target.value);
              }}
              list="locations"
            ></input>
            {location ? (
              <button className={styles.clearButton} onClick={clearInput}>
                Clear
              </button>
            ) : (
              ""
            )}
          </div>

          <datalist id="locations">
            {suggestedLocations &&
              suggestedLocations.map((loc) => {
                return (
                  <option
                    key={loc.properties.osm_id}
                    value={loc.properties.name + ", " + loc.properties.country}
                  />
                );
              })}
          </datalist>

          <button
            className={styles.inputButton}
            type="submit"
            onClick={displayEarthquakes}
          >
            Search
          </button>
        </form>

        <div className={styles.sentenceContainer}>{sentence}</div>

        {allEarthquakes.length && status === "Loading.." ? (
          <div className={styles.listContainer}>
            <p className={styles.listText}>Here are the 10 strongest ones:</p>
            {allEarthquakes.splice(0, 10).map((event) => {
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
          <p className={styles.errorMessage}>{status}</p>
        )}
      </div>
    </div>
  );
}
