import React, { useState, useEffect, useCallback } from 'react';
import CityList from './CityList';
import { FormattedWeatherData } from '../models';
import { formatWeatherData, listCitiesIdMap } from '../util';
import { requestWeatherData, requestListWeatherData } from '../service';
import '../styles/App.scss';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<FormattedWeatherData[]>([]);

  const handleRequestListWeather = useCallback(async () => {
    const citiesIdArray = Object.values(listCitiesIdMap);
    const listWeatherData = await requestListWeatherData(citiesIdArray);

    if (Array.isArray(listWeatherData)) {
      const formattedData = formatWeatherData(listWeatherData);
      setWeatherData(formattedData);
    }
  }, []);

  useEffect(() => {
    // handleRequestListWeather();
  }, [handleRequestListWeather]);

  return (
    <main className="App">
      <CityList weatherData={weatherData} />
    </main>
  );
};

export default App;
