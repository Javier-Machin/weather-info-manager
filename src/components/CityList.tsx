import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormattedWeatherData } from '../models';
import CityRow from './CityRow';
import '../styles/CityList.scss';

interface CityListProps {
  listWeatherData: FormattedWeatherData[];
}

const CityList: React.FC<CityListProps> = (props) => {
  const { listWeatherData } = props;
  const listWeatherDataSorted = listWeatherData.sort((cityA, cityB) =>
    cityA.location.localeCompare(cityB.location)
  );

  return (
    <section className="city-list">
      {listWeatherDataSorted.map(({ location, temp }) => {
        return (
          <CityRow key={uuidv4()} location={location} temp={Math.round(temp)} />
        );
      })}
    </section>
  );
};

export default CityList;
