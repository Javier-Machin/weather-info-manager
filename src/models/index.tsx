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
}

export interface FormattedWeatherData {
  location: string;
  temp: number;
  tempFeeling: number;
  tempMax: number;
  tempMin: number;
  clouds: number;
  windSpeed: number;
  description: string;
  favorite: boolean;
}

export interface ErrorMessage {
  error: string;
}
