# earthquakes-archive

Earthquakes search engine based on USGS database.

Based on USGS database, this project is a search engine that goes through the archives and return a list of earthquakes that occured around a given city.

In order to get that, this app uses datas from Photon (Open Source API) to get the choosen city' coordinates and datas from USGS (US Government earthquakes database) to list the earthquakes history. More here:

- Photon: https://photon.komoot.io/
- USGS: https://earthquake.usgs.gov/

The search is limited to:

- a 300 km radius around the given place to display a relevant amount of results even in low seismic zones.
- earthquakes with a minimum magnitude of 3. Under 1 and 3, only seismograph can feel it.
- earthquakes that occured between 2000 and 2022 to provide the user with the latest datas.

Tech: This project uses Javascript, HTML, CSS and React framework.
