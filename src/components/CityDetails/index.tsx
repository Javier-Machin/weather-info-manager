import React from 'react';
import { FormattedWeatherData } from '../../models';
import '../../styles/CityDetails/CityDetails.scss';
import CityDetailsEntry from './CityDetailsEntry';
import Button from '../Button';
interface CityDetailsProps {
  weatherData?: FormattedWeatherData;
  setSelectedCity: React.Dispatch<FormattedWeatherData | null>;
  cityPresentInList: (name: string) => boolean;
  addCityToList: (city: FormattedWeatherData) => void;
}

// Add option to add city to list, search reroutes to this page

const CityDetails: React.FC<CityDetailsProps> = (props) => {
  const { weatherData, setSelectedCity, addCityToList, cityPresentInList } = props;
  if (!weatherData) return null;

  const {
    name,
    clouds,
    temp,
    tempFeeling,
    tempMin,
    tempMax,
    description,
    windSpeed,
  } = weatherData;

  const handleDeselectCity = () => {
    setSelectedCity(null);
  };

  const handleAddCityToList = () => {
    addCityToList(weatherData);
    handleDeselectCity();
  };

  return (
    <section className="city-details">
      <Button onClick={handleDeselectCity} text="Go back to list" btnType="button" />
      {!cityPresentInList(name) && (
        <Button onClick={handleAddCityToList} text="Add city to list" btnType="button" />
      )}
      <CityDetailsEntry label="" value={name} />
      <CityDetailsEntry label="Clouds cover: " value={`${clouds}%`} />
      <CityDetailsEntry label="Temperature: " value={`${temp}ºC`} />
      <CityDetailsEntry label="Temperature feeling: " value={`${tempFeeling}ºC`} />
      <CityDetailsEntry label="Temperature minimum: " value={`${tempMin}ºC`} />
      <CityDetailsEntry label="Temperature maximum: " value={`${tempMax}ºC`} />
      <CityDetailsEntry label="Weather description: " value={description} />
      <CityDetailsEntry label="Wind speed: " value={`${windSpeed} Km/h`} />
    </section>
  );
};

export default CityDetails;
