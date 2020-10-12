import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormattedWeatherData } from '../../models';
import CityRow from './CityRow';
import '../../styles/CityList/CityList.scss';

interface CityListProps {
  listWeatherData: FormattedWeatherData[];
  setSelectedCity: React.Dispatch<FormattedWeatherData | null>;
  deleteCityFromList: (cityName: string) => void;
}

const CityList: React.FC<CityListProps> = (props) => {
  const { listWeatherData, setSelectedCity, deleteCityFromList } = props;
  const listWeatherDataSorted = listWeatherData.sort((cityA, cityB) =>
    cityA.name.localeCompare(cityB.name)
  );

  const handleSelectCity = (name: string) => {
    const selectedCity = listWeatherData.find((city) => city.name === name);
    if (selectedCity) setSelectedCity(selectedCity);
  };

  return (
    <section className="city-list">
      {listWeatherDataSorted.map(({ name, temp }) => {
        return (
          <CityRow
            key={uuidv4()}
            name={name}
            temp={temp}
            onClick={handleSelectCity}
            deleteCityFromList={deleteCityFromList}
          />
        );
      })}
    </section>
  );
};

export default CityList;
