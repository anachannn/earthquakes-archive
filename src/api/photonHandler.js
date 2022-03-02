import axios from "axios";

const service = axios.create({
  baseURL: "https://photon.komoot.io/api/",
  withCredentials: false,
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const photonHandler = {
  service,

  getSuggestedLocations(location) {
    return service
      .get("https://photon.komoot.io/api/", {
        params: {
          q: location,
          limit: "10",
        },
      })
      .then()
      .catch(errorHandler);
  },
};

export default photonHandler;
