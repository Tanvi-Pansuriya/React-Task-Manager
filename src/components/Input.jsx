import React, { useState } from "react";
import { Form, InputGroup, Alert } from "react-bootstrap";
import ButtonComponent from "./ButtonComponent";
import { useDispatch } from "react-redux";
import { addTask } from "../slice/toDoSlice";
import '../App.css';

const Input = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() === "") {
      setError("Please enter a task");
      return;
    }
    dispatch(addTask(text.trim()));
    setText("");
    setError("");
  };

  return (
    <div className="input-container">
      <InputGroup className="mb-2">
        <Form.Control
          placeholder="Enter todo..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className={error ? "error-border" : ""}
        />
        <ButtonComponent onClick={handleAdd} className="add-btn">
          Add
        </ButtonComponent>
      </InputGroup>
      {error && (
        <Alert variant="danger" className="error-message">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default Input;
