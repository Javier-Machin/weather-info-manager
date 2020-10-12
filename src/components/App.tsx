import React, { useState, useEffect, useCallback, Fragment } from 'react';
import CityList from './CityList';
import CityNotes from './CityNotes';
import CityDetails from './CityDetails';
import { requestListWeatherData, requestWeatherByCoords } from '../service';
import {
  formatWeatherData,
  getDataFromLocal,
  getUserCoordinates,
  listCitiesIdMap,
  localStorageAvailable,
  saveDataToLocal,
} from '../util';
import '../styles/App.scss';

// Interfaces
import { FormattedWeatherData, ErrorMessage } from '../models';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<FormattedWeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<FormattedWeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const handleRequestListWeather = useCallback(async () => {
    const listCitiesIds = Object.values(listCitiesIdMap);
    const serviceResponse = await requestListWeatherData(listCitiesIds);

    if (Array.isArray(serviceResponse)) {
      const formattedData = formatWeatherData(serviceResponse);
      saveDataToLocal(formattedData);
      setWeatherData(formattedData);
      return;
    } else if (localStorageAvailable()) {
      const localWeatherData = getDataFromLocal();
      if (localWeatherData) {
        setWeatherData(localWeatherData);
        return;
      }
    }
    // If we reach this we have a service error
    setErrorMessage(serviceResponse);
  }, []);

  useEffect(() => {
    handleRequestListWeather();
  }, [handleRequestListWeather]);

  const handleUserLocationWeather = async () => {
    let serviceResponse;
    const locationResponse: any = await getUserCoordinates();

    if (Array.isArray(locationResponse)) {
      serviceResponse = await requestWeatherByCoords(locationResponse[0]);
      if (Array.isArray(serviceResponse)) {
        const formattedData = formatWeatherData(serviceResponse);
        setSelectedCity(formattedData[0]);
        return;
      }
    }
    // If we reach this we either have a service error or a location error
    serviceResponse ? setErrorMessage(serviceResponse) : setErrorMessage(locationResponse);
  };

  if (errorMessage) {
    console.log(errorMessage);
  }
  // TODO Implement notes logic

  // TODO Implement search

  // TODO Implement add from details to list

  // TODO Implement remove from list

  // TODO Implement list favorites

  // TODO Implement render errors

  // TODO Extract button as component

  // TODO Improve design

  // TODO Add correct token

  // TODO Add tests

  // TODO Push to heroku

  return (
    <main className="App">
      <h3 className="main-title">Weather Info Manager</h3>
      <button onClick={handleUserLocationWeather}>Check weather for my location</button>
      {selectedCity ? (
        <Fragment>
          <CityDetails setSelectedCity={setSelectedCity} weatherData={selectedCity} />
          <CityNotes cityName={selectedCity.name} />
        </Fragment>
      ) : (
        <CityList setSelectedCity={setSelectedCity} listWeatherData={weatherData} />
      )}
    </main>
  );
};

export default App;
