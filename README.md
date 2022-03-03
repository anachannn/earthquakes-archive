# earthquakes-archive

Welcome to <b>earthquakes-archives</b>, a search engine to learn more about the seismic history of your place!

## 🌍 The app

Homepage:

<img width="500" alt="Screenshot 2022-03-03 at 08 17 45" src="https://user-images.githubusercontent.com/75322641/156515760-aff11c2c-35c5-4e2e-9413-7f53f6b65acc.png">

When the search is done:

<img width="500" alt="Screenshot 2022-03-03 at 08 19 19" src="https://user-images.githubusercontent.com/75322641/156515773-8d5ebc99-69a8-4c72-b4c2-8e2d9d78e869.png">

## 🌊 Sources

Based on USGS (US Government earthquakes database), this project is a search engine that goes through the archives of USGS and return a list of earthquakes that occured around a given city, anywhere in the world.

In order to get that, this app uses datas from Photon (Open Source API) to get the choosen city's coordinates and datas from USGS to list the earthquakes history of the place. More here:

- Photon: https://photon.komoot.io/
- USGS: https://earthquake.usgs.gov/

<b>To optimize the results,</b> the search is limited to:

- a 200 km radius around the given place to display a relevant amount of results even in low seismic zones.
- earthquakes with a minimum magnitude of 3. Between magnitude 1 and magnitude 3, only seismograph can feel it.
- earthquakes that occured between 2000 and 2022 to provide the user with the latest datas.

## 🌋 Tech

This project uses <b>Javascript, HTML, CSS</b> and <b>React framework</b>.

Thanks for reading & have a good time using it!
