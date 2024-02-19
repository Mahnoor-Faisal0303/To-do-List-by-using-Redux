import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-uuid';


interface TodoState {
    todoList: { id: string; name: string }[]  ;
}
const initialState: TodoState = {
    todoList: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<string>) => {
            state.todoList = [...state.todoList, { id: uuid(), name: action.payload }];
        },
        deleteTodo: (state: TodoState, action: PayloadAction<string>) => {
            state.todoList = state.todoList.filter((item) => item.id !== action.payload);
        },
        updateTodo: (state: TodoState, action: PayloadAction<{ id: string; newName: string }>) => {
            const { id, newName } = action.payload;
            state.todoList = state.todoList.map(todo => {
                if (todo.id === id) {
                    return { ...todo, name: newName };
                }
                return todo;
            });
        }

    },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;


