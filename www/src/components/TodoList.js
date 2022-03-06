import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import M from "materialize-css";

import Todo from "./Todo";

function TodoList({ todos, setTodos, getTodos }) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);
  // Add on spacebar
  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.key === " " && location.pathname === "/") {
  //       navigate("/new-todo");
  //     }
  //   });
  // }, []);

  return todos.length === 0 ? (
    <div>
      <h4 className="center-align">To-Do list is empty..</h4>
      <h6 className="center-align">
        Add new with spacebar, navigate back with escape key
      </h6>

      {/* Bottom right button */}
      <div className="fixed-action-btn ">
        <a
          onClick={() => {
            navigate("/new-todo");
          }}
          className="btn-floating btn-large blue pulse"
        >
          <i className="large material-icons">add</i>
        </a>
      </div>
      {/*  */}
    </div>
  ) : (
    <div className="todo-container">
      <header>To-Do list:</header>
      {/* Bottom right button */}
      <div className="fixed-action-btn  ">
        <a
          onClick={() => {
            navigate("/new-todo");
          }}
          className="btn-floating btn-large blue pulse"
        >
          <i className="large material-icons">add</i>
        </a>
      </div>
      {/*  */}
      <ul className="todo-list row container ">
        {todos.map((todo) => (
          <Todo
            completed={todo.completed}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            getTodos={getTodos}
            text={todo.text}
            key={todo.id}
          />
        ))}
      </ul>
    </div>
  );
  // return (
  //   <div className="todo-container">
  //     <header>Simple todos</header>
  //     {/* Bottom right button */}
  //     <div className="fixed-action-btn ">
  //       <a
  //         onClick={() => {
  //           navigate("/new-todo");
  //         }}
  //         className="btn-floating btn-large blue pulse"
  //       >
  //         <i className="large material-icons">add</i>
  //       </a>
  //     </div>
  //     {/*  */}
  //     <ul className="todo-list">
  //       {todos.map((todo) => (
  //         <Todo
  //           completed={todo.completed}
  //           todo={todo}
  //           todos={todos}
  //           setTodos={setTodos}
  //           getTodos={getTodos}
  //           text={todo.text}
  //           key={todo.id}
  //         />
  //       ))}
  //     </ul>
  //   </div>
  // );
}

export default TodoList;
