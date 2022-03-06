import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import moment from "moment";

import { API } from "../services/api";

function Todo({ text, todos, setTodos, getTodos, todo, completed }) {
  const navigate = useNavigate();
  const [del, setDel] = useState({});

  // const dateToFormat = "1976-04-19T12:59-0500";
  // var moment = require("moment");
  // moment().format("MMM Do YY");

  // AXIOS;
  // Delete filters id and sets Todos to a new aray without that id
  const deleteHandle = async () => {
    // Pravi novi niz filtriran za element sa odgovarajucim ID
    // const newTodos = todos.filter((element) => element.id !== todo.id);
    // Postuje novi niz

    let deletedItem = todos.find((element) => element.id === todo.id);
    setDel(deletedItem);
    console.log(deletedItem);

    API.delete(`/todo/${todo.id}`)
      .then(() => {
        // A OVDE TOAST ZA USPESNO
        M.Toast.dismissAll();
        M.toast({
          html: "Todo deleted!",
          displayLength: 1300,
          classes: "green white-text",
          outDuration: 0.5,
        });
        getTodos();
      })
      .catch((e) => {
        // DODAJ ERROR AKO NE MOZ SE OBRISE
        console.log(e);
      });
  };

  // AXIOS
  const completedHandle = () => {
    API.put(`/todo/${todo.id}`)
      .then(() => {
        //Toast
        M.Toast.dismissAll();
        M.toast({
          html: "Todo updated. Way to go!",
          displayLength: 1300,
          classes: "green white-text",
          outDuration: 0.5,
        });

        // Get
        getTodos();
      })
      .catch((e) => {
        // TOAST ZA ERROR
        M.toast({
          html: "Something went wrong",
          displayLength: 1300,
          classes: "red white-text",
          outDuration: 0.5,
        });
        console.log(e);
      });
  };

  const undoHandle = () => {
    API.post("/new-todo", del)
      .then((r) => {
        M.toast({
          html: "Success!",
          displayLength: 1300,
          classes: "green white-text",
          outDuration: 0.5,
        });
        getTodos();
      })
      .catch((e) => {
        console.log(e);
        M.toast({
          html: "Something went wrong",
          displayLength: 1300,
          classes: "red white-text",
          outDuration: 0.5,
        });
      });
  };

  return (
    <div className="todo  grey lighten-5 z-depth-2 hoverable">
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

      {/* Ovde nam daje id u url on click */}
      <div className="icons valign-wrapper">
        <i
          onClick={() => {
            navigate(`/edit-todo/${todo.id}`);
          }}
          className=" hover small-size  material-icons blue-text "
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
}

export default Todo;

// Delete filters id and sets Todos to a new aray without that id
// FETCH
// DELETE
// const deleteHandle = () => {
//   const newTodos = todos.filter((element) => element.id !== todo.id);

//   const res = fetch("http://localhost:5000/api/todos", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newTodos),
//   });

//   res.then((r) => {
//     getTodos();
//   });
// };

// Take todo id, and change the completedd status in oposite way
// FETCH
// completed
// const completedHandle = () => {
//   const copyTodos = [...todos];
//   const index = copyTodos.findIndex((item) => item.id === todo.id);
//   copyTodos[index].completed = !completed;

//   const res = fetch("http://localhost:5000/api/todos", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(copyTodos),
//   });

//   res.then((r) => {
//     getTodos();
//   });
//   // setTodos(copyTodos);
// };
