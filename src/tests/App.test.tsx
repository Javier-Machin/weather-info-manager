import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { mockGetListAPIresponse } from './helpers';
import { LocalStorageMock } from '@react-mock/localstorage';

describe('Weather info manager', () => {
  let container: Element;

  beforeAll(() => {
    mockGetListAPIresponse();
  });

  beforeEach(() => {
    const app = render(
      <LocalStorageMock items={{}}>
        <App />
      </LocalStorageMock>
    );
    container = app.container;
  });

  test('it renders a list of cities', () => {
    const cityList = container.querySelector('.city-list');
    expect(cityList).not.toBe(null);
  });

  test('it populates the city list with API response', async () => {
    await screen.findByText('Delhi');
  });

  test('it renders a search component', () => {
    screen.getByPlaceholderText('Enter a city');
  });

  test('it renders a check local weather button', () => {
    screen.getByText('Check local weather');
  });
});
