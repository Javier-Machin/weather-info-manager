import React from 'react';
import '../../styles/CityList/CityRow.scss';

interface CityRowProps {
  onClick: (target: string) => void;
  deleteCityFromList: (cityName: string) => void;
  name: string;
  temp: number;
}

const CityRow: React.FC<CityRowProps> = (props) => {
  const { name, temp, onClick, deleteCityFromList } = props;

  return (
    <div className="city-row" id={name}>
      <button onClick={onClick!.bind(null, name)} type="button">
        {name}
      </button>
      <span>{`${temp} ºC`}</span>
      <button type="button" onClick={deleteCityFromList.bind(null, name)}>
        Remove
      </button>
    </div>
  );
};

export default CityRow;
