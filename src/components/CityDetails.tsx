import React from 'react';
import { FormattedWeatherData } from '../models';
import '../styles/CityDetails.scss';
import CityNotes from './CityNotes';

interface CityDetailsProps {
  weatherData?: FormattedWeatherData;
}

const CityDetails: React.FC<CityDetailsProps> = (props) => {
  const { weatherData } = props;
  if (!weatherData) return null;

  const {
    location,
    clouds,
    temp,
    tempFeeling,
    tempMin,
    tempMax,
    description,
    windSpeed,
  } = weatherData;

  return (
    <section className="city-details">
      <span>City: {location}</span>
      <span>Clouds cover: {clouds}%</span>
      <span>Temperature: {temp}ºC</span>
      <span>Temperature feeling: {tempFeeling}ºC</span>
      <span>Temperature minimum: {tempMin}ºC</span>
      <span>Temperature max: {tempMax}ºC</span>
      <span>Weather description: {description}</span>
      <span>Wind speed: {windSpeed} Km/h</span>
      <CityNotes location={location} />
    </section>
  );
};

export default CityDetails;
