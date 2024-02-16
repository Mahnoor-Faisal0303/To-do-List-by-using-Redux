import React from 'react';
import { DeleteEditButton } from '../Style/HomeStyle';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <DeleteEditButton onClick={onClick}>Delete</DeleteEditButton>
  );
}
export default DeleteButton;
