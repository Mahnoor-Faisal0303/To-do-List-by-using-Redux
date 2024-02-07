import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-uuid';


interface TodoState {
    todoList: { id: string; name: string }[];
    editText: { id: string; name: string } | null;

}

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todoList: [],
        editText: null,
    },
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<string>) => {
            state.todoList = [...state.todoList, { id: uuid(), name: action.payload }];
        },
        deleteTodo: (state: TodoState, action: PayloadAction<string>) => {
            state.todoList = state.todoList.filter((item) => item.id !== action.payload);
        },
        editTodo: (state: TodoState, action: PayloadAction<{ id: string; name: string } | null>) => {
            state.editText = action.payload;
        },
        updateTodo: (state: TodoState, action: PayloadAction<{ id: string; newName: string }>) => {
            const { id, newName } = action.payload;
            state.todoList = state.todoList.map(todo => {
                if (todo.id === id) {
                    return { ...todo, name: newName };
                }
                return todo;
            });
            state.editText = null;
        }

    },
});

export const { addTodo, deleteTodo, editTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;


