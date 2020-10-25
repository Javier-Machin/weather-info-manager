import React, { useState, useEffect, useCallback, Fragment } from 'react';
import CityList from './CityList';
import CityNotes from './CityNotes';
import CityDetails from './CityDetails';
import CitySearch from './CitySearch';
import ErrorMessageBanner from './ErrorMessageBanner';
import Button from './Button';
import { requestListWeatherData, requestWeatherByCoords } from '../service';
import {
  formatWeatherData,
  localAvailable,
  saveDataToLocal,
  getUserCoordinates,
  listCitiesIdMap,
  getDataFromLocal,
} from '../util';
import '../styles/App.scss';

// Interfaces
import { FormattedWeatherData, ErrorMessage } from '../models';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<FormattedWeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<FormattedWeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const handleRequestListWeather = useCallback(async () => {
    setErrorMessage(null);
    if (localAvailable) {
      const localWeatherData = getDataFromLocal('weatherData');

      // The user manually deleted all cities from list
      if (localWeatherData && !localWeatherData.length) return;

      // If we have a list of cities in local storage, update their weather data
      if (localWeatherData) {
        const localCitiesIds = localWeatherData.map((city) => city.cityId);
        const serviceResponse = await requestListWeatherData(localCitiesIds);

        if (Array.isArray(serviceResponse)) {
          const formattedData = formatWeatherData(serviceResponse);
          saveDataToLocal('weatherData', formattedData);
          setWeatherData(formattedData);
        } else {
          // If the local data can't be updated, load the last known data
          setWeatherData(localWeatherData);
          setErrorMessage(serviceResponse);
        }
        return;
      }
    }

    // If we don't have cities in local, fetch the top 15 by population and save them
    const top15CitiesIds = Object.values(listCitiesIdMap);
    const serviceResponse = await requestListWeatherData(top15CitiesIds);

    if (Array.isArray(serviceResponse)) {
      const formattedData = formatWeatherData(serviceResponse);
      if (localAvailable) saveDataToLocal('weatherData', formattedData);
      setWeatherData(formattedData);
      return;
    }

    // If we reach this we have a service error
    setErrorMessage(serviceResponse);
  }, []);

  const handleUserLocationWeather = async () => {
    setErrorMessage(null);
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
    if (localAvailable) saveDataToLocal('weatherData', updatedCities);
    setWeatherData(updatedCities);
  };

  const handleDeleteCityFromList = (cityName: string) => {
    const updatedCities = weatherData.filter((city) => city.name !== cityName);
    if (localAvailable) saveDataToLocal('weatherData', updatedCities);
    setWeatherData(updatedCities);
  };

  useEffect(() => {
    handleRequestListWeather();
  }, [handleRequestListWeather]);

  const cityCanBeAddedToList = (name: string) => {
    return !weatherData.find((city) => city.name === name) && weatherData.length < 20;
  };

  const handleClearErrors = () => {
    setErrorMessage(null);
  };

  return (
    <main className="App">
      {!!errorMessage && (
        <ErrorMessageBanner errorMessage={errorMessage} clearErrors={handleClearErrors} />
      )}
      <h3 className="main-title">Weather Info Manager</h3>
      <CitySearch setSelectedCity={setSelectedCity} setErrorMessage={setErrorMessage} />
      <Button
        onClick={handleUserLocationWeather}
        text="Check local weather"
        btnType="button"
        btnClasses="button-user-location"
      />
      {selectedCity ? (
        <Fragment>
          <CityDetails
            addCityToList={handleAddCityToList}
            cityCanBeAddedToList={cityCanBeAddedToList}
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
