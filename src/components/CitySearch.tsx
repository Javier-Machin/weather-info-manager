import React, { useState } from 'react';
import { ErrorMessage, FormattedWeatherData } from '../models';
import { requestWeatherData } from '../service';
import { formatWeatherData } from '../util';
import '../styles/CitySearch.scss';
import Button from './Button';

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
    setErrorMessage(null);
    const serviceResponse = await requestWeatherData(value);

    if (Array.isArray(serviceResponse)) {
      const formattedData = formatWeatherData(serviceResponse);
      setSelectedCity(formattedData[0]);
    } else {
      setErrorMessage(serviceResponse);
    }
  };

  return (
    <form>
      <input
        className="text-area"
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
      <Button onClick={handleSubmitSearch} btnType="submit" text="Search" />
    </form>
  );
};

export default CitySearch;
