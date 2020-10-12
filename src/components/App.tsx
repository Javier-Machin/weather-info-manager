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
  const [selectedCity, setSelectedCity] = useState<FormattedWeatherData | null>(null);
  const [weatherData, setWeatherData] = useState<FormattedWeatherData[]>([]);
  const [serviceError, setServiceError] = useState<ErrorMessage | null>(null);

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

    setServiceError(serviceResponse);
  }, []);

  useEffect(() => {
    handleRequestListWeather();
  }, [handleRequestListWeather]);

  const handleUserLocationWeather = async () => {
    const locationResponse = await getUserCoordinates();

    if (typeof locationResponse !== 'string') {
      const userLocationWeather = await requestWeatherByCoords(locationResponse);
      if (Array.isArray(userLocationWeather)) {
        const formattedData = formatWeatherData(userLocationWeather);
        setSelectedCity(formattedData[0]);
      }
    }
  };

  if (serviceError) {
    console.log(serviceError);
  }
  // TODO Implement ask user location, fetch weather and set as selected

  // TODO Implement notes logic

  // TODO Implement search

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
