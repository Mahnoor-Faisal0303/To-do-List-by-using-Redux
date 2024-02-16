import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Store/Slices/todoSlice";
import loginReducer from "./Store/Slices/loginSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  todos: todoReducer,
  logins: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools:true,
});

export type RootState = ReturnType<typeof store.getState>;
