import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

describe('Weather info manager', () => {
  let container: Element;
  beforeEach(() => {
    const app = render(<App />);
    container = app.container;
  });

  test('it renders a list of cities', async () => {
    const cityList = container.querySelector('.city-list');
    expect(cityList).not.toBe(null);
  });

  test('it renders a search component', async () => {
    screen.getByPlaceholderText('Enter a city');
  });

  test('it renders a check local weather button', async () => {
    screen.getByText('Check local weather');
  });
});
