import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Favorite, FormattedWeatherData } from '../../models';
import CityRow from './CityRow';
import '../../styles/CityList/CityList.scss';
import { getDataFromLocal, localAvailable, saveDataToLocal } from '../../util';

interface CityListProps {
  listWeatherData: FormattedWeatherData[];
  setSelectedCity: React.Dispatch<FormattedWeatherData | null>;
  deleteCityFromList: (cityName: string) => void;
}

const CityList: React.FC<CityListProps> = (props) => {
  const { listWeatherData, setSelectedCity, deleteCityFromList } = props;
  const [favorites, setFavorites] = useState<Favorite[]>(getDataFromLocal('favorites') || []);

  const handleSelectCity = (name: string) => {
    const selectedCity = listWeatherData.find((city) => city.name === name);
    if (selectedCity) setSelectedCity(selectedCity);
  };

  const handleToggleCityFavorite = (cityName: string) => {
    const updatedFavorites = [...favorites];
    const cityToUpdateIndex = favorites.findIndex((city) => city.name === cityName);

    cityToUpdateIndex >= 0
      ? updatedFavorites.splice(cityToUpdateIndex, 1)
      : updatedFavorites.push({ name: cityName });

    if (localAvailable) saveDataToLocal('favorites', updatedFavorites);
    setFavorites(updatedFavorites);
  };

  const favoriteCities = listWeatherData
    .filter((city) => favorites.some((favoriteCity) => city.name === favoriteCity.name))
    .sort((cityA, cityB) => cityA.name.localeCompare(cityB.name));

  const regularCities = listWeatherData
    .filter((city) => !favorites.some((favoriteCity) => city.name === favoriteCity.name))
    .sort((cityA, cityB) => cityA.name.localeCompare(cityB.name));

  return (
    <section className="city-list">
      {favoriteCities.map(({ name, temp }) => {
        return (
          <CityRow
            key={uuidv4()}
            name={name}
            temp={temp}
            favorite
            onClick={handleSelectCity}
            deleteCityFromList={deleteCityFromList}
            toggleCityFavorite={handleToggleCityFavorite}
          />
        );
      })}
      {regularCities.map(({ name, temp }) => {
        return (
          <CityRow
            key={uuidv4()}
            name={name}
            temp={temp}
            favorite={false}
            onClick={handleSelectCity}
            deleteCityFromList={deleteCityFromList}
            toggleCityFavorite={handleToggleCityFavorite}
          />
        );
      })}
    </section>
  );
};

export default CityList;
