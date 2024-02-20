import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList, ListedItem, ParentBox, Heading, InputText } from '../Style/HomeStyle';
import { addTodo, deleteTodo, updateTodo } from '../Store/Slices/todoSlice'
import { RootState } from '../store';
import { ListItemSecondaryAction, ListItemText } from '@mui/material';
import PrimaryButton from '../Component/PrimaryButton';
import { setLoggedOut } from '../Store/Slices/loginSlice';
import { generatePath, useNavigate } from 'react-router-dom';
import APP_ROUTES from '../Constant/Routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '../Style/LoginScreenStyle';
import SecondaryButton from '../Component/SecondaryButton';
import useEditHook from '../Hooks/EditCustomHook';

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

  const {editedId, handleEditButtonClick} = useEditHook({setShowUpdateButton,setShowAddButton,todoList,setTodoText})

  const handleUpdateButtonClick = () => {
    if (todoText.trim() === '') {
      setError("text", { type: "manual", message: "Please write something" });
      return;
    }
    setShowUpdateButton(false);
    setShowAddButton(true);
    dispatch(updateTodo({ id: editedId, newName: todoText }));
    setTodoText('');
  }
  const handleAddButtonClick = () => {
    if (todoText.trim() === '') {
      setError("text", { type: "manual", message: "Please write something" });
      return;
    }
    dispatch(addTodo(todoText));
    setTodoText('');
  }
  
  const handleLogoutButtonClick = () => {
    dispatch(setLoggedOut());
    navigate(generatePath(APP_ROUTES.LOGIN_PAGE));
  };

  const onSubmit: SubmitHandler<IFormInput> = ({ text }) => {
    if (text.trim() === '') {
      return;
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
            <PrimaryButton type='submit' onClick={handleAddButtonClick} title="Add"/>
          )}

          {showUpdateButton && (
            <PrimaryButton type='submit' onClick={handleUpdateButtonClick} title="Update" />)}

          <TodoList>
            {todoList.map((item: { id: string; name: string; }) => (
              <ListedItem key={item.id} >
                <ListItemText key={item.id} primary={item.name} />
                <ListItemSecondaryAction>
                  <SecondaryButton onClick={() => handleDeleteButtonClick(item.id)} title="Delete"/>
                  <SecondaryButton onClick={() => handleEditButtonClick(item.id)} title="Edit"/>
                </ListItemSecondaryAction>
              </ListedItem>
            ))}
          </TodoList>

          <PrimaryButton onClick={handleLogoutButtonClick} title="Logout" />
        </form>
      </ParentBox>
    </Fragment >

  );
};
export default Home;

