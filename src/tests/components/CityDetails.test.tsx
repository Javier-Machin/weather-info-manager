import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CityDetails from '../../components/CityDetails';

const mockWeatherData = {
  cityId: 435454,
  name: 'Madrid',
  temp: 22,
  tempFeeling: 25,
  tempMax: 24,
  tempMin: 21,
  clouds: 53,
  windSpeed: 3,
  description: 'Sunny',
  favorite: false,
};

const mockSetSelectedCity = jest.fn(() => {});
const mockCityCanBeAddedToList = jest.fn((name: string) => true);
const mockCityCanBeAddedToListFalse = jest.fn((name: string) => false);
const mockAddCityToList = jest.fn(() => {});

describe('CityDetails', () => {
  beforeEach(() => {
    render(
      <CityDetails
        weatherData={mockWeatherData}
        setSelectedCity={mockSetSelectedCity}
        cityCanBeAddedToList={mockCityCanBeAddedToList}
        addCityToList={mockAddCityToList}
      />
    );
  });

  test('it renders a list of data entries', () => {
    screen.getByText('Sunny');
    screen.getByText('25ºC');
    screen.getByText('Temperature maximum:');
    screen.getByText('Temperature minimum:');
    screen.getByText('53%');
  });

  test('it renders an add to list button', () => {
    screen.getByText('Add city to list');
  });

  test('it renders a go back to list button', () => {
    screen.getByText('Go back to list');
  });

  describe('when clicking on the add city to list button', () => {
    beforeEach(() => {
      const addCityBtn = screen.getByText('Add city to list');
      fireEvent.click(addCityBtn);
    });

    test('the correct handler is called', () => {
      expect(mockAddCityToList).toHaveBeenCalled();
    });
  });

  describe('when clicking on the go back to list button', () => {
    beforeEach(() => {
      const backToListBtn = screen.getByText('Go back to list');
      fireEvent.click(backToListBtn);
    });

    test('the correct handler is called', () => {
      expect(mockSetSelectedCity).toHaveBeenCalledWith(null);
    });
  });
});

describe('when the current city can not be added to the list', () => {
  test('it does not render the add city to list button', () => {
    const { queryByText } = render(
      <CityDetails
        weatherData={mockWeatherData}
        setSelectedCity={mockSetSelectedCity}
        cityCanBeAddedToList={mockCityCanBeAddedToListFalse}
        addCityToList={mockAddCityToList}
      />
    );

    expect(queryByText('Add city to list')).toBe(null);
  });
});
