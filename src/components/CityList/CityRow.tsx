import React from 'react';
import classnames from 'classnames';
import '../../styles/CityList/CityRow.scss';

interface CityRowProps {
  onClick: (target: string) => void;
  deleteCityFromList: (cityName: string) => void;
  toggleCityFavorite: (cityName: string) => void;
  name: string;
  temp: number;
  favorite: boolean;
}

const CityRow: React.FC<CityRowProps> = (props) => {
  const { name, temp, favorite, onClick, deleteCityFromList, toggleCityFavorite } = props;
  const rowClasses = classnames({
    'city-row': true,
    'city-row-favorite': favorite,
  });

  return (
    <div className={rowClasses} id={name}>
      <button onClick={onClick!.bind(null, name)} type="button">
        {name}
      </button>
      <span>{`${temp} ºC`}</span>
      <button type="button" onClick={toggleCityFavorite.bind(null, name)}>
        Fav
      </button>
      <button type="button" onClick={deleteCityFromList.bind(null, name)}>
        Remove
      </button>
    </div>
  );
};

export default CityRow;
