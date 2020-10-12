import React from 'react';
import classnames from 'classnames';
import Button from '../Button';
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
      <Button onClick={onClick!.bind(null, name)} text={name} btnType="button" />
      <span>{`${temp} ºC`}</span>
      <Button onClick={deleteCityFromList.bind(null, name)} text="Remove" btnType="button" />
      <Button onClick={toggleCityFavorite.bind(null, name)} text="Fav" btnType="button" />
    </div>
  );
};

export default CityRow;
