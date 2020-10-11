import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormattedWeatherData } from '../models';
import CityRow from './CityRow';

interface CityListProps {
  weatherData: FormattedWeatherData[];
}

const CityList: React.FC<CityListProps> = (props) => {
  const { weatherData } = props;
  const weatherDataSorted = weatherData.sort((cityA, cityB) =>
    cityA.location.localeCompare(cityB.location)
  );

  return (
    <section className="city-list">
      {weatherDataSorted.map(({ location, temp }) => {
        return (
          <CityRow key={uuidv4()} location={location} temp={Math.round(temp)} />
        );
      })}
    </section>
  );
};

export default CityList;
