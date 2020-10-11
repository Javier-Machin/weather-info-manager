import React from 'react';
import { FormattedWeatherData } from '../models';
import '../styles/CityDetails.scss';

interface CityDetailsProps {
  weatherData?: FormattedWeatherData;
}

const CityDetails: React.FC<CityDetailsProps> = (props) => {
  const { weatherData } = props;
  if (!weatherData) return null;

  return (
    <section className="city-details">
      <span>City: {weatherData.location}</span>
      <span>Clouds cover: {weatherData.clouds}%</span>
      <span>Temperature: {weatherData.temp}ºC</span>
      <span>Temperature feeling: {weatherData.tempFeeling}ºC</span>
      <span>Temperature minimum: {weatherData.tempMin}ºC</span>
      <span>Temperature max: {weatherData.tempMax}%</span>
      <span>Weather description: {weatherData.description}%</span>
      <span>Wind speed: {weatherData.windSpeed} Km/h</span>
    </section>
  );
};

export default CityDetails;
