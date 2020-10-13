import React from 'react';
import '../../styles/CityDetails/CityDetailsEntry.scss';

interface CityDetailsEntryProps {
  label: string;
  value: string;
}

const CityDetailsEntry: React.FC<CityDetailsEntryProps> = (props) => {
  const { label, value } = props;

  return (
    <div className="city-details-entry">
      {!!label && <span className="city-details-entry-label">{label}</span>}
      <span className="city-details-entry-value">{value}</span>
    </div>
  );
};

export default CityDetailsEntry;
