import axios from "axios";

const service = axios.create({
  baseURL:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  withCredentials: false,
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  getAllEarthquakes() {
    return service
      .get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      )
      .then()
      .catch(errorHandler);
  },

  getListOfEarthquakes(lat, long) {
    return service
      .get(`https://earthquake.usgs.gov/fdsnws/event/1/query`, {
        params: {
          format: "geojson",
          latitude: lat,
          longitude: long,
          maxradiuskm: "300",
          endtime: "2022-01-01",
          starttime: "2000-01-01",
          minmagnitude: "3",
          eventtype: "earthquake",
          //limit: "20",
        },
      })
      .then()
      .catch(errorHandler);
  },
};

export default apiHandler;