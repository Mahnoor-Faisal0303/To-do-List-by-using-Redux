import React from 'react';
import { useDispatch } from 'react-redux';
import { _Button } from '../Style/HomeStyle';
import { addTodo } from '../Store/Slices/todoSlice';

interface AddButtonTodoProps {
  todoText: string;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
}

const AddButtonTodo: React.FC<AddButtonTodoProps> = ({ todoText, setShowAlert, setTodoText }) => {
  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    if (todoText.trim() === '') {
      setShowAlert(true);
      setTimeout(function () {
        setShowAlert(false);
      }, 2000);
      return;
    }
    dispatch(addTodo(todoText));
    setTodoText('');
  }

  return (
    <_Button onClick={handleAddButtonClick}>Add</_Button>
  );
}

export default AddButtonTodo;
