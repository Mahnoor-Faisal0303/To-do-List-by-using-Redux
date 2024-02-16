import React from 'react';
import { _Button } from '../Style/HomeStyle';

export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  title: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({ type, onClick, title}) => {
  return ( 
    <_Button type={type} onClick={onClick} >{title}</_Button>
  );
}
export default PrimaryButton;
