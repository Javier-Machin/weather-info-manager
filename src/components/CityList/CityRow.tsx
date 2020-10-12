import React from 'react';
import { FaCity, FaStar, FaTrashAlt } from 'react-icons/fa';
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
      <FaCity />
      <Button
        onClick={onClick!.bind(null, name)}
        text={name}
        btnType="button"
        btnClasses="city-name"
      />
      <span className="city-row-temp">{`${temp} ºC`}</span>
      <Button
        onClick={toggleCityFavorite.bind(null, name)}
        text={<FaStar />}
        btnType="button"
        btnClasses="button-star"
      />
      <Button
        onClick={deleteCityFromList.bind(null, name)}
        text={<FaTrashAlt />}
        btnType="button"
        btnClasses="button-trash"
      />
    </div>
  );
};

export default CityRow;
