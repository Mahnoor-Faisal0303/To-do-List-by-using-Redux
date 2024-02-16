import React from 'react';
import { DeleteEditButton } from '../Style/HomeStyle';

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <DeleteEditButton onClick={onClick}>Edit</DeleteEditButton>
  );
}
export default EditButton;
