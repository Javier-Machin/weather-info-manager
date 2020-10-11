import React, { useState, useEffect, useCallback, Fragment } from 'react';
import CityList from './CityList';
import CityNotes from './CityNotes';
import CityDetails from './CityDetails';
import { requestListWeatherData } from '../service';
import {
  formatWeatherData,
  getDataFromLocal,
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

  if (serviceError) {
    console.log(serviceError);
  }

  return (
    <main className="App">
      <h3 className="main-title">Weather Info Manager</h3>
      <button>Check weather for my location</button>
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
