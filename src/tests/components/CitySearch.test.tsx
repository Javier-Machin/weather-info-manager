import React from 'react';
import { render, screen } from '@testing-library/react';
import CitySearch from '../../components/CitySearch';

const mockSetSelectedCity = jest.fn(() => {});
const mockSetErrorMessage = jest.fn(() => {});

describe('CitySearch', () => {
  beforeEach(() => {
    render(
      <CitySearch
        placeholder="Enter a city"
        setSelectedCity={mockSetSelectedCity}
        setErrorMessage={mockSetErrorMessage}
      />
    );
  });

  test('it renders correctly', () => {
    screen.getByText('Search');
  });
});
