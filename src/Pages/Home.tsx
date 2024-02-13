import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList, ListedItem, DeleteEditButton, ParentBox, Heading } from '../Style/HomeStyle';
import { deleteTodo, editTodo } from '../Store/Slices/todoSlice'
import { RootState } from '../Redux Store/store';
import { Alert, ListItemSecondaryAction, ListItemText } from '@mui/material';
import LogoutTodoButton from '../Component/LogoutTodoButton';
import InputTextTodo from '../Component/InputTextTodo';
import AddButtonTodo from '../Component/AddButtonTodo';
import UpdateButtonTodo from '../Component/UpdateButtonTodo';

const Home: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>(false);
  const [showAddButton, setShowAddButton] = useState<boolean>(true);
  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todos.todoList);

  const handleDeleteButtonClick = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const [newId, setNewId] = useState<string>("");

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

  return (
    <Fragment>
      <ParentBox>
        <Heading variant="h2">Todo List</Heading>

        <InputTextTodo todoText={todoText} setTodoText={setTodoText} />

        {showAddButton && (
          <AddButtonTodo todoText={todoText} setShowAlert={setShowAlert} setTodoText={setTodoText} />
        )}

        {showUpdateButton && (
          <UpdateButtonTodo
          todoText={todoText}
          setShowAlert={setShowAlert}
          setTodoText={setTodoText}
          setShowUpdateButton={setShowUpdateButton}
          setShowAddButton={setShowAddButton}
          dispatch={dispatch}
          newId={newId}
        />
        )}

        <TodoList>
          {todoList.map((item: { id: string; name: string; }) => (
            <ListedItem key={item.id} >
              <ListItemText key={item.id} primary={item.name} />
              <ListItemSecondaryAction>
                <DeleteEditButton onClick={() => handleDeleteButtonClick(item.id)}>Delete</DeleteEditButton>
                <DeleteEditButton onClick={() => handleEditButtonClick(item.id)}>Edit</DeleteEditButton>
              </ListItemSecondaryAction>
            </ListedItem>
          ))}

        </TodoList>

        {
          showAlert && (
            <Alert variant="filled" severity="info">
              Please write something!
            </Alert>
          )
        }
        <LogoutTodoButton />
      </ParentBox>
    </Fragment >

  );
};
export default Home;

