import React from 'react';
import { DeleteEditButton } from '../Style/HomeStyle';
import  { ButtonProps } from './PrimaryButton'

const SecondaryButton: React.FC<ButtonProps> = ({ onClick, title }) => {
  return (
    <DeleteEditButton onClick={onClick}>{title}</DeleteEditButton>
  );
}
export default SecondaryButton;