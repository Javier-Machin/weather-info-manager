// Interfaces and Types used in more than one place
export interface WeatherDataResponse {
  clouds: { all: number };
  main: {
    feels_like: number;
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  wind: {
    speed: number;
  };
  weather: [{ description: string }];
  id: number;
}

export interface FormattedWeatherData {
  cityId: number;
  name: string;
  temp: number;
  tempFeeling: number;
  tempMax: number;
  tempMin: number;
  clouds: number;
  windSpeed: number;
  description: string;
  favorite: boolean;
}

export interface Note {
  id: string;
  value: string;
  location: string;
}

export interface ErrorMessage {
  error: string;
}

export interface CoordinatesObj {
  latitude: number;
  longitude: number;
}

export type LocalData = Note[] | FormattedWeatherData[] | null;
