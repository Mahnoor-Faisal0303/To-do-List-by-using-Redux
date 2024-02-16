import React from 'react';
import { _Button } from '../Style/HomeStyle';

interface AddButtonProps {
 // onClick: () => void;
  type: "button" | "submit" | "reset" | undefined;
}

const AddButton: React.FC<AddButtonProps> = ({ type }) => {
  return (
    <_Button type={type} >ADD</_Button>
  );
}
export default AddButton;
