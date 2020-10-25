import React from 'react';
import { render, screen } from '@testing-library/react';
import CityList from '../../components/CityList';
import { FormattedWeatherData } from '../../models';
import { LocalStorageMock } from '@react-mock/localstorage';

const mockWeatherData = [
  {
    cityId: 435454,
    name: 'Madrid',
    temp: 22,
    tempFeeling: 25,
    tempMax: 24,
    tempMin: 21,
    clouds: 53,
    windSpeed: 3,
    description: 'Sunny',
  },
  {
    cityId: 435453,
    name: 'Barcelona',
    temp: 23,
    tempFeeling: 25,
    tempMax: 24,
    tempMin: 21,
    clouds: 53,
    windSpeed: 3,
    description: 'Rainy',
  },
] as FormattedWeatherData[];

const mockSetSelectedCity = jest.fn(() => {});
const mockdeleteCityFromList = jest.fn((name: string) => {});
let container: Element;

describe('CityList', () => {
  beforeEach(() => {
    const component = render(
      <LocalStorageMock items={{ favorites: JSON.stringify([{ name: 'Madrid' }]) }}>
        <CityList
          deleteCityFromList={mockdeleteCityFromList}
          setSelectedCity={mockSetSelectedCity}
          listWeatherData={mockWeatherData}
        />
      </LocalStorageMock>
    );

    container = component.container;
  });

  test('it renders buttons with the name of the cities', () => {
    screen.getByText('Madrid');
    screen.getByText('Barcelona');
  });

  test('it renders a star icon button for favorites and non favorites with the correct classes', () => {
    const favoriteStar = container.querySelector('.city-row-favorite .button-star');
    const nonFavoriteStar = container.querySelector('.city-row .button-star');
    expect(favoriteStar).not.toBe(null);
    expect(nonFavoriteStar).not.toBe(null);
  });

  test('it renders delete icon buttons', () => {
    const trashIcons = container.querySelectorAll('.button-trash');
    expect(trashIcons.length).toBe(2);
  });
});
