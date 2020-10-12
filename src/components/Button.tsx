import React from 'react';
import '../styles/Button.scss';

interface ButtonProps {
  onClick: (event?: any) => any;
  btnType: 'submit' | 'button';
  btnClasses?: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, btnType, btnClasses, text }) => {
  return (
    <button onClick={onClick} type={btnType} className={`button ${btnClasses}`}>
      {text}
    </button>
  );
};

export default Button;
