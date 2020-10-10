import React from 'react';
import '../styles/CityRow.scss';

interface CityRowProps {
  onClick?: (target: any) => void;
  onKeyPress?: (target: any) => void;
  location: string;
  temp: number;
}

const CityRow: React.FC<CityRowProps> = (props) => {
  const { location, temp, onClick, onKeyPress } = props;

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      const target = event.currentTarget as HTMLElement;
      onClick(target);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const keyPressed = event.key;
    if (
      (onKeyPress || onClick) &&
      (keyPressed === 'Enter' || keyPressed === ' ')
    ) {
      const target = event.currentTarget as HTMLElement;
      onKeyPress ? onKeyPress(target) : onClick!(target);
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      className="city-row"
      id="london"
    >
      <span>{location}</span>
      <span>{`${temp} ºC`}</span>
    </div>
  );
};

export default CityRow;
