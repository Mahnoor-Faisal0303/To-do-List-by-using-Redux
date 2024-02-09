import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonStyle, ListStyle, ListItemStyle, TextFieldStyle, DeleteEditButtonStyle, LogoutButtonStyle } from '../HomeStyle';
import { addTodo, deleteTodo, editTodo, updateTodo } from '../Store/Slices/todoSlice'
import { RootState } from '../store';
import { Alert, ListItemSecondaryAction, ListItemText } from '@mui/material';
import APP_ROUTES from '../Constant/Routes';
import { generatePath, useNavigate } from 'react-router-dom';

const TodoListComponent: React.FC = () => {
  const [todoText, setTodoText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todoList = useSelector((state: RootState) => state.todos.todoList);

  const handleAddButtonClick = () => {
    if (todoText.trim() === '') {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    dispatch(addTodo(todoText));
    setTodoText('');
  };

  const handleDeleteButtonClick = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const [newId, setNewId] = useState("-1");

  const handleEditButtonClick = (id: string) => {
    setShowUpdateButton(true);
    setShowAddButton(false);
    const editedItem = todoList.find((item) => item.id === id);
    if (editedItem) {
      setTodoText(editedItem.name);
      dispatch(editTodo(editedItem));
    }
    setNewId(id);
  }
  const handleUpdateButtonClick = () => {
    if (todoText.trim() === '') {
      setShowAlert(true);
      return;
    }
    setShowUpdateButton(false);
    setShowAddButton(true);
    setShowAlert(false);
    dispatch(updateTodo({ id: newId, newName: todoText }));
    setTodoText('');
  }

  const handleLogoutButtonClick = () => {
    localStorage.removeItem('loggedInData');
    navigate(generatePath(APP_ROUTES.LOGIN_PAGE));
  };


  return (
    <Fragment>
      <TextFieldStyle
        InputProps={{ style: { fontSize: 30, fontWeight: 'bold', color: 'brown', fontFamily: "cursive" } }}
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      {showAddButton && (
        <ButtonStyle onClick={handleAddButtonClick}>Add</ButtonStyle>
      )}

      {showUpdateButton && (
        <ButtonStyle onClick={() => handleUpdateButtonClick()}>Update</ButtonStyle>
      )}
      <ListStyle>
        {todoList.map((item: { id: string; name: string; }) => (
          <ListItemStyle key={item.id} >
            <ListItemText key={item.id} primary={item.name} />
            <ListItemSecondaryAction>
              <DeleteEditButtonStyle onClick={() => handleDeleteButtonClick(item.id)}>Delete</DeleteEditButtonStyle>
              <DeleteEditButtonStyle onClick={() => handleEditButtonClick(item.id)}>Edit</DeleteEditButtonStyle>
            </ListItemSecondaryAction>
          </ListItemStyle>
        ))}

      </ListStyle>

      {
        showAlert && (
          <Alert variant="filled" severity="info">
            Please write something!
          </Alert>
        )
      }

      <LogoutButtonStyle onClick={() => handleLogoutButtonClick()}>
        logout
      </LogoutButtonStyle>
    </Fragment >

  );
};
export default TodoListComponent;
