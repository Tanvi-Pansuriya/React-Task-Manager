import { configureStore } from "@reduxjs/toolkit";
import todotaskReducer from "./slice/toDoSlice";

const store = configureStore({
  reducer: {
    todos: todotaskReducer,
  },
});

export default store;
