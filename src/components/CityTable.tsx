import React from 'react';
import CityRow from './CityRow';

const CityTable: React.FC = () => {
  return (
    <section className="city-table">
      <CityRow />
      <CityRow />
      <CityRow />
      <CityRow />
      <CityRow />
    </section>
  );
};

export default CityTable;
