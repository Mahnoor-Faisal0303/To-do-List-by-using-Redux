import { _Button } from "../Style/HomeStyle";

interface updateButtonTodoProps {
    onClick: () => void;
}
const updateButtonTodo: React.FC<updateButtonTodoProps> = ({onClick}) => {
    return (
        <_Button onClick={onClick}>Update</_Button>
    )
}
export default updateButtonTodo;