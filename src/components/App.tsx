import React, { useState, useEffect, useCallback } from 'react';
import CityList from './CityList';
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

  // Implement citydetails through a route, with the location as param

  return (
    <main className="App">
      <CityList listWeatherData={weatherData} />
    </main>
  );
};

export default App;
