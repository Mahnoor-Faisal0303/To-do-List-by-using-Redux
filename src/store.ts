import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Store/Slices/todoSlice";
import loginReducer from "./Store/Slices/loginSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    logins:loginReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
