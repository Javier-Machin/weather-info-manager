import React from 'react';
import '../styles/CityRow.scss';

interface CityRowProps {
  onClick?: () => void;
  onKeyPress?: () => void;
}

const CityRow: React.FC<CityRowProps> = (props) => {
  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    console.log(target.id);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      console.log(keyPressed);
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      className="city-row"
    >
      <span>London</span>
      <span>23ºC</span>
    </div>
  );
};

export default CityRow;
