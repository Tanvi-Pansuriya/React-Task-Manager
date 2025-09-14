import React, { useState, useEffect } from "react";
import { ListGroup, Form, Tabs, Tab, Pagination } from "react-bootstrap";
import ButtonComponent from "./ButtonComponent";
import { useSelector, useDispatch } from "react-redux";
import { statusTask, removeTask, updateTask } from "../slice/toDoSlice";

const ToDoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [activeTab, setActiveTab] = useState("pending"); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "completed") return todo.completed;
    if (activeTab === "pending") return !todo.completed;
    return true; 
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (id) => {
    dispatch(updateTask({ id, newName: editText }));
    setEditId(null);
    setEditText("");
  };

  const renderList = (filteredTodos) => (
    <ListGroup>
      {filteredTodos.map((todo) => (
        <ListGroup.Item
          key={todo.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            {editId === todo.id ? (
              <Form.Control
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUpdate(todo.id)}
              />
            ) : (
              <span className={todo.completed ? "completed" : ""}>
                {todo.name}
              </span>
            )}
          </div>

          <div>
            <ButtonComponent
              variant={todo.completed ? "secondary" : "success"}
              onClick={() => dispatch(statusTask(todo.id))}
            >
              {todo.completed ? "Incomplete" : "Complete"}
            </ButtonComponent>

            {editId === todo.id ? (
              <>
                <ButtonComponent variant="success" onClick={() => handleUpdate(todo.id)}>
                  Save
                </ButtonComponent>
                <ButtonComponent variant="secondary" onClick={() => setEditId(null)}>
                  Cancel
                </ButtonComponent>
              </>
            ) : (
              <>
                <ButtonComponent
                  variant="warning"
                  onClick={() => {
                    setEditId(todo.id);
                    setEditText(todo.name);
                  }}
                >
                  Edit
                </ButtonComponent>
                <ButtonComponent
                  variant="danger"
                  onClick={() => dispatch(removeTask(todo.id))}
                >
                  Delete
                </ButtonComponent>
              </>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    const maxVisiblePages = 5; 
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
    );

    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-start" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis-end" />);
      }
      items.push(
        <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    );

    return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
  };

  return (
    <div className="mt-4">
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="pending" title="Pending">
          {renderList(currentItems)}
          {renderPagination()}
        </Tab>
        <Tab eventKey="completed" title="Completed">
          {renderList(currentItems)}
          {renderPagination()}
        </Tab>
      </Tabs>
    </div>
  );
};

export default ToDoList;
