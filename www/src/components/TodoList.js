import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import M from "materialize-css";

import Todo from "./Todo";

const TodoList = ({ todos, setTodos, getTodos }) => {
  const navigate = useNavigate();

  // Handle spacebar
  const handleKey = useCallback(
    (e) => {
      if (e.key === " ") {
        e.preventDefault();
        navigate("/new-todo");
      }
    },
    [navigate]
  );
  // Add listener on use effect
  useEffect(() => {
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return todos.length === 0 ? (
    <div>
      <h4 className="center-align">To-Do list is empty..</h4>
      <h6 className="center-align">
        Add new with spacebar, navigate back with escape key
      </h6>

      {/* Bottom right button */}
      <div className="fixed-action-btn ">
        <span
          onClick={() => {
            navigate("/new-todo");
          }}
          className="btn-floating btn-large blue pulse"
        >
          <i className="large material-icons">add</i>
        </span>
      </div>
    </div>
  ) : (
    <div className="todo-container">
      <header>To-Do list:</header>
      {/* Bottom right button */}
      <div className="fixed-action-btn  ">
        <span
          onClick={() => {
            navigate("/new-todo");
          }}
          className="btn-floating btn-large blue pulse"
        >
          <i className="large material-icons">add</i>
        </span>
      </div>

      <ul className="todo-list row container ">
        {todos.map((todo, index) => (
          <div key={index}>
            <Todo
              completed={todo.completed}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              getTodos={getTodos}
              text={todo.text}
              indexKey={index}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
