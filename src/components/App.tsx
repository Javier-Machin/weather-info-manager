import React, { useState, useEffect, useCallback, Fragment } from 'react';
import CityList from './CityList';
import CityNotes from './CityNotes';
import CityDetails from './CityDetails';
import { requestListWeatherData, requestWeatherByCoords } from '../service';
import {
  formatWeatherData,
  getWeatherFromLocal,
  getUserCoordinates,
  listCitiesIdMap,
  localStorageAvailable,
  saveDataToLocal,
} from '../util';
import '../styles/App.scss';

// Interfaces
import { FormattedWeatherData, ErrorMessage } from '../models';
import CitySearch from './CitySearch';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<FormattedWeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<FormattedWeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const handleRequestListWeather = useCallback(async () => {
    const listCitiesIds = Object.values(listCitiesIdMap);
    const serviceResponse = await requestListWeatherData(listCitiesIds);

    if (Array.isArray(serviceResponse)) {
      const formattedData = formatWeatherData(serviceResponse);
      saveDataToLocal('weatherData', formattedData);
      setWeatherData(formattedData);
      return;
    } else if (localStorageAvailable()) {
      const localWeatherData = getWeatherFromLocal();
      if (localWeatherData) {
        setWeatherData(localWeatherData);
        return;
      }
    }
    // If we reach this we have a service error
    setErrorMessage(serviceResponse);
  }, []);

  const handleUserLocationWeather = async () => {
    const locationResponse = await getUserCoordinates();
    let serviceResponse;

    if (Array.isArray(locationResponse)) {
      serviceResponse = await requestWeatherByCoords(locationResponse[0]);
      if (Array.isArray(serviceResponse)) {
        const formattedData = formatWeatherData(serviceResponse);
        setSelectedCity(formattedData[0]);
        return;
      }
    }
    // If we reach this we have a service error or a location error
    serviceResponse ? setErrorMessage(serviceResponse) : setErrorMessage(locationResponse);
  };

  const handleAddCityToList = (city: FormattedWeatherData) => {
    const updatedCities = [...weatherData, city];
    saveDataToLocal('weatherData', updatedCities);
    setWeatherData(updatedCities);
  };

  const handleDeleteCityFromList = (cityName: string) => {
    const updatedCities = weatherData.filter((city) => city.name !== cityName);
    saveDataToLocal('weatherData', updatedCities);
    setWeatherData(updatedCities);
  };

  useEffect(() => {
    handleRequestListWeather();
  }, [handleRequestListWeather]);

  const cityPresentInList = (name: string) => {
    return !!weatherData.find((city) => city.name === name);
  };

  if (errorMessage) {
    console.log(errorMessage);
  }

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
      <CitySearch setSelectedCity={setSelectedCity} setErrorMessage={setErrorMessage} />
      <button onClick={handleUserLocationWeather}>Check weather for my location</button>
      {selectedCity ? (
        <Fragment>
          <CityDetails
            addCityToList={handleAddCityToList}
            cityPresentInList={cityPresentInList}
            setSelectedCity={setSelectedCity}
            weatherData={selectedCity}
          />
          <CityNotes cityName={selectedCity.name} />
        </Fragment>
      ) : (
        <CityList
          deleteCityFromList={handleDeleteCityFromList}
          setSelectedCity={setSelectedCity}
          listWeatherData={weatherData}
        />
      )}
    </main>
  );
};

export default App;
