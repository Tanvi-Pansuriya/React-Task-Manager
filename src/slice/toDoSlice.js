import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

let nextId = 1;

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: nextId++,
        name: action.payload,
        completed: false,
      });
    },
    statusTask: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTask: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, newName } = action.payload;
      const todo = state.find(t => t.id === id);
      if (todo) todo.name = newName;
    }
  },
});

export const { addTask, statusTask, removeTask, updateTask } = todoSlice.actions;
export default todoSlice.reducer;
