import React from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { API } from "../services/api";
import { showSnackbar } from "../common/functions";

const Todo = ({ text, todos, setTodos, getTodos, todo, completed }) => {
  const navigate = useNavigate();

  //

  // Delete
  const deleteHandle = () => {
    API.delete(`/todo/${todo.id}`)
      .then(() => {
        showSnackbar("Success");
        getTodos();
      })
      .catch((e) => {
        showSnackbar("Something went wrong", "error");
        console.log(e);
      });
  };

  // Complete
  const completedHandle = () => {
    API.put(`/todo/${todo.id}`)
      .then(() => {
        showSnackbar("Successfully updated");

        getTodos();
      })
      .catch((e) => {
        showSnackbar("Something went wrong", "error");
      });
  };

  return (
    <div className="todo grey lighten-5 z-depth-2 hoverable">
      <div className="">
        <p
          className={
            todo.completed
              ? "complete todo-item grey-text  "
              : "todo-item black-text  "
          }
        >
          {text}
        </p>
        <p>{moment(todo.timestamp).format("lll")}</p>
      </div>

      <div className="icons valign-wrapper">
        <i
          onClick={() => {
            navigate(`/edit-todo/${todo.id}`);
          }}
          className=" hover small-size material-icons blue-text "
        >
          edit
        </i>
        <i
          onClick={() => completedHandle()}
          className="hover small-size material-icons blue-text"
        >
          {todo.completed ? "check_circle" : "check"}
        </i>

        <i
          onClick={deleteHandle}
          className="hover small-size material-icons red-text"
        >
          delete
        </i>
      </div>
    </div>
  );
};

export default Todo;
