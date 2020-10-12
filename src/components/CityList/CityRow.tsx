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
      <i className="fas fa-city" />
      <Button
        onClick={onClick!.bind(null, name)}
        text={name}
        btnType="button"
        btnClasses="city-name"
      />
      <span>{`${temp} ºC`}</span>
      <Button
        onClick={toggleCityFavorite.bind(null, name)}
        text={<i className="far fa-star" />}
        btnType="button"
        btnClasses="button-star"
      />
      <Button
        onClick={deleteCityFromList.bind(null, name)}
        text={<i className="far fa-trash-alt" />}
        btnType="button"
        btnClasses="button-trash"
      />
    </div>
  );
};

export default CityRow;
