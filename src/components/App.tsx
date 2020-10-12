import React, { useState, useEffect, useCallback, Fragment } from 'react';
import CityList from './CityList';
import CityNotes from './CityNotes';
import CityDetails from './CityDetails';
import ErrorMessageBanner from './ErrorMessageBanner';
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
import Button from './Button';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<FormattedWeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<FormattedWeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const handleRequestListWeather = useCallback(async () => {
    setErrorMessage(null);
    const localAvailable = localStorageAvailable();

    if (localAvailable) {
      const localWeatherData = getWeatherFromLocal();

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
    saveDataToLocal('weatherData', updatedCities);
    setWeatherData(updatedCities);
  };

  const handleDeleteCityFromList = (cityName: string) => {
    const updatedCities = weatherData.filter((city) => city.name !== cityName);
    saveDataToLocal('weatherData', updatedCities);
    setWeatherData(updatedCities);
  };

  const handleToggleCityFavorite = (cityName: string) => {
    const cityToUpdateIndex = weatherData.findIndex((city) => city.name === cityName);
    const updatedCities = [...weatherData];
    updatedCities[cityToUpdateIndex].favorite = !weatherData[cityToUpdateIndex].favorite;
    saveDataToLocal('weatherData', updatedCities);
    setWeatherData(updatedCities);
  };

  useEffect(() => {
    handleRequestListWeather();
  }, [handleRequestListWeather]);

  const cityPresentInList = (name: string) => {
    return !!weatherData.find((city) => city.name === name);
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
            cityPresentInList={cityPresentInList}
            setSelectedCity={setSelectedCity}
            weatherData={selectedCity}
          />
          <CityNotes cityName={selectedCity.name} />
        </Fragment>
      ) : (
        <CityList
          toggleCityFavorite={handleToggleCityFavorite}
          deleteCityFromList={handleDeleteCityFromList}
          setSelectedCity={setSelectedCity}
          listWeatherData={weatherData}
        />
      )}
    </main>
  );
};

export default App;
