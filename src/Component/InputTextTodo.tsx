import React from "react";
import { InputText } from "../Style/HomeStyle";

interface InputTextTodoProps {
    todoText: string;
    setTodoText: (text: string) => void;
  }

const InputTextTodo: React.FC<InputTextTodoProps>  = ({ todoText, setTodoText }) => {
  return (
    <InputText
      InputProps={{
        style: { fontSize: 30, fontWeight: 'bold', color: 'brown', fontFamily: "cursive" }
      }}
      type="text"
      value={todoText}
      onChange={(e) => setTodoText(e.target.value)}
    />
  );
};

export default InputTextTodo;
