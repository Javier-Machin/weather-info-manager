import { WeatherDataResponse, FormattedWeatherData } from '../models';

// Remove not needed keys and improve format

const formatWeatherData = (weatherData: WeatherDataResponse[]) => {
  return weatherData.map((data) => {
    return {
      cityId: data.id,
      name: data.name,
      temp: Math.round(data.main.temp),
      tempFeeling: Math.round(data.main.feels_like),
      tempMax: Math.round(data.main.temp_max),
      tempMin: Math.round(data.main.temp_min),
      clouds: data.clouds.all,
      windSpeed: Math.round(data.wind.speed * 3.6), // convert to Km/h
      description: data.weather[0].description,
      favorite: false,
    };
  }) as FormattedWeatherData[];
};

/*
  Mapping between the top 15 cities by population and their ID in the weather service,
  required to get weather data for all of them in a single request.
*/

const listCitiesIdMap = {
  tokyo: 1850147,
  delhi: 1273294,
  shanghai: 1796236,
  'sao paulo': 3448433,
  'mexico city': 3530597,
  dhaka: 1185241,
  cairo: 360630,
  beijing: 1816670,
  mumbai: 1275339,
  osaka: 1853908,
  karachi: 1174872,
  chongqing: 1814906,
  istanbul: 745044,
  'buenos aires': 3435907,
  kolkata: 1275004,
};

// LocalStorage API handling

// Check if the localStorage API is available

const localStorageAvailable = () => {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const saveDataToLocal = (
  key: string,
  data: FormattedWeatherData[] | { id: string; value: string; location: string }[]
) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getWeatherFromLocal = () => {
  let data = localStorage.getItem('weatherData');
  return data ? (JSON.parse(data) as FormattedWeatherData[]) : null;
};

const getNotesFromLocal = () => {
  let data = localStorage.getItem('notes');
  return data ? (JSON.parse(data) as { id: string; value: string; location: string }[]) : null;
};

const getUserCoordinates = () => {
  return new Promise<any>((resolve, _) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success: PositionCallback = (pos: Position) => {
      resolve([pos.coords]);
    };

    const error = (err: { code: number; message: string }) => {
      resolve({ error: err.message });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
};

export {
  listCitiesIdMap,
  formatWeatherData,
  localStorageAvailable,
  saveDataToLocal,
  getWeatherFromLocal,
  getNotesFromLocal,
  getUserCoordinates,
};
