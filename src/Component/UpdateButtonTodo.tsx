import { updateTodo } from "../Store/Slices/todoSlice";
import { _Button } from "../Style/HomeStyle";
import { Dispatch } from 'redux';

interface updateButtonTodoProps {
    todoText: string;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    setTodoText: React.Dispatch<React.SetStateAction<string>>;
    setShowUpdateButton: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAddButton: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: Dispatch;
    newId: string;
}
const updateButtonTodo: React.FC<updateButtonTodoProps> = ({
    todoText,
    setShowAlert,
    setTodoText,
    setShowUpdateButton,
    setShowAddButton,
    dispatch,
    newId
}) => {

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
    return (
        <_Button onClick={() => handleUpdateButtonClick()}>Update</_Button>
    )
}
export default updateButtonTodo;