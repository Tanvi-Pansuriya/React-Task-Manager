import React from "react";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="custom-container mt-5">
      <h2 className="text-center mb-4">My Todo App</h2>
      <Input />
      <TodoList />
    </div>
  );
};

export default App;
