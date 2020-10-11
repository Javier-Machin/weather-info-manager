import React from 'react';
import '../styles/CityRow.scss';

interface CityRowProps {
  onClick?: (target: string) => void;
  onKeyPress?: (target: string) => void;
  location: string;
  temp: number;
}

const CityRow: React.FC<CityRowProps> = (props) => {
  const { location, temp, onClick, onKeyPress } = props;

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      const target = event.currentTarget.id as string;
      onClick(target);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const keyPressed = event.key;
    if (
      (onKeyPress || onClick) &&
      (keyPressed === 'Enter' || keyPressed === ' ')
    ) {
      const target = event.currentTarget.id as string;
      onKeyPress ? onKeyPress(target) : onClick!(target);
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      className="city-row"
      id={location}
    >
      <span>{location}</span>
      <span>{`${temp} ºC`}</span>
    </div>
  );
};

export default CityRow;
