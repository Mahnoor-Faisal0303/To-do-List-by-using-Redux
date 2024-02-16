import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList, ListedItem, ParentBox, Heading, InputText, } from '../Style/HomeStyle';
import { addTodo, deleteTodo, editTodo, updateTodo } from '../Store/Slices/todoSlice'
import { RootState } from '../store';
import { ListItemSecondaryAction, ListItemText } from '@mui/material';
import LogoutTodoButton from '../Component/LogoutTodoButton';
import AddButton from '../Component/AddButtonTodo';
import UpdateButtonTodo from '../Component/UpdateButtonTodo';
import { setLoggedOut } from '../Store/Slices/loginSlice';
import { generatePath, useNavigate } from 'react-router-dom';
import APP_ROUTES from '../Constant/Routes';
import DeleteButton from '../Component/DeleteButton';
import EditButton from '../Component/EditButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '../Style/LoginScreenStyle';

interface IFormInput {
  text: string
}

const Home: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormInput>()

  const [todoText, setTodoText] = useState<string>('');
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>(false);
  const [showAddButton, setShowAddButton] = useState<boolean>(true);
  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todos.todoList);
  const navigate = useNavigate();

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
  const handleUpdateButtonClick = () => {
    if (todoText.trim() === '') {
      setError("text", { type: "manual", message: "Please write something" });
      return;
    }
    setShowUpdateButton(false);
    setShowAddButton(true);
    dispatch(updateTodo({ id: newId, newName: todoText }));
    setTodoText('');
  }

  const handleLogoutButtonClick = () => {
    dispatch(setLoggedOut());
    navigate(generatePath(APP_ROUTES.LOGIN_PAGE));
  };

  const onSubmit: SubmitHandler<IFormInput> = ({ text }) => {
    if (text.trim() === '') {
      return;
    } else {
      dispatch(addTodo(text));
      setTodoText('');
    }
  }

  return (
    <Fragment>
      <ParentBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading variant="h2">Todo List</Heading>
          <InputText
            InputProps={{
              style: { fontSize: 30, fontWeight: 'bold', color: 'brown', fontFamily: "cursive" }
            }}
            {...register("text", { required: true })}
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            error={errors.text ? true : false}

          />
          <ErrorMessage variant="caption" color="error">
            {errors.text && "Please Write Something"}
          </ErrorMessage>

          {showAddButton && (
            <AddButton type="submit" />
          )}

          {showUpdateButton && (
            <UpdateButtonTodo onClick={handleUpdateButtonClick} />)}

          <TodoList>
            {todoList.map((item: { id: string; name: string; }) => (
              <ListedItem key={item.id} >
                <ListItemText key={item.id} primary={item.name} />
                <ListItemSecondaryAction>
                  <DeleteButton onClick={() => handleDeleteButtonClick(item.id)} />
                  <EditButton onClick={() => handleEditButtonClick(item.id)} />
                </ListItemSecondaryAction>
              </ListedItem>
            ))}

          </TodoList>
          <LogoutTodoButton onClick={handleLogoutButtonClick} />
        </form>
      </ParentBox>
    </Fragment >

  );
};
export default Home;

