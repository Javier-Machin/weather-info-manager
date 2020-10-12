import Axios from 'axios';
import { WeatherDataResponse, ErrorMessage, CoordinatesObj } from '../models';

const SERVICE_URL = 'https://api.openweathermap.org/data/2.5/';

const requestWeatherData = async (location: string) => {
  const formattedLocation = location.trim().toLowerCase();

  try {
    const response = await Axios.get(
      `${SERVICE_URL}weather?q=${formattedLocation}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_ID}`
    );

    return [response.data] as WeatherDataResponse[];
  } catch (error) {
    return handleRequestError(error);
  }
};

const requestListWeatherData = async (locationIds: number[]) => {
  try {
    const response = await Axios.get(
      `${SERVICE_URL}group?id=${locationIds}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_ID}a`
    );

    return response.data.list as WeatherDataResponse[];
  } catch (error) {
    return handleRequestError(error);
  }
};

const requestWeatherByCoords = async (coordinates: CoordinatesObj) => {
  const { latitude, longitude } = coordinates;

  try {
    const response = await Axios.get(
      `${SERVICE_URL}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_ID}`
    );

    return [response.data] as WeatherDataResponse[];
  } catch (error) {
    return handleRequestError(error);
  }
};

function handleRequestError(error: Error): ErrorMessage {
  if (error.message.includes('404')) {
    return {
      error: "Sorry, we don't have weather information for that location",
    };
  } else {
    return {
      error: 'Sorry, the weather service is not available right now, try again later',
    };
  }
}

export { requestWeatherData, requestListWeatherData, requestWeatherByCoords };
