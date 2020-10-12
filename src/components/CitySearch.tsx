import React, { useState } from 'react';
import { ErrorMessage, FormattedWeatherData } from '../models';
import { requestWeatherData } from '../service';
import { formatWeatherData } from '../util';
import '../styles/CitySearch.scss';

interface CitySearchProps {
  placeholder?: string;
  setSelectedCity: React.Dispatch<FormattedWeatherData | null>;
  setErrorMessage: React.Dispatch<ErrorMessage | null>;
}

const CitySearch: React.FC<CitySearchProps> = (props) => {
  const { placeholder = '', setSelectedCity, setErrorMessage } = props;
  const [value, setValue] = useState('');

  const handleOnChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    setValue(newValue);
  };

  const handleSubmitSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const serviceResponse = await requestWeatherData(value);

    if (Array.isArray(serviceResponse)) {
      const formattedData = formatWeatherData(serviceResponse);
      setSelectedCity(formattedData[0]);
      return;
    }
    // If we reach this we have a service error
    setErrorMessage(serviceResponse);
  };

  return (
    <form>
      <input
        className="text-area"
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
      <button onClick={handleSubmitSearch} type="submit">
        Search
      </button>
    </form>
  );
};

export default CitySearch;
