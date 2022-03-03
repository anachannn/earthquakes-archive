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

const usgsHandler = {
  service,

  getListOfEarthquakes(lat, long) {
    return service
      .get(`https://earthquake.usgs.gov/fdsnws/event/1/query`, {
        params: {
          format: "geojson",
          latitude: lat,
          longitude: long,
          maxradiuskm: "200",
          endtime: "2022-01-01",
          starttime: "2000-01-01",
          minmagnitude: "3",
          eventtype: "earthquake",
          orderby: "magnitude",
        },
      })
      .then((data) => data.data.features)
      .catch(errorHandler);
  },
};

export default usgsHandler;
