import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { API } from "../services/api";

// prepravi funkciju u arrow
// postman - aplikacija
function TodoForm({ getTodos, todos }) {
  const [todo, setTodo] = useState("");
  // Preuzimamo ga iz URL i koristimo
  const { id } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef();
  // Back on backspace
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    });
  }, []);

  // Capital letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //Send on enter
  let handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitHandle();
    }
  };

  // If id, izvlaci text iz objekta i stavlja ga u input value
  useEffect(() => {
    if (id) {
      const editItem = todos.find((item) => item.id === id);
      console.log(editItem);
      setTodo(editItem.text);
      inputRef.current.focus();
    }
    inputRef.current.focus();
  }, [id]);

  const inputHandle = (e) => {
    console.log(e);
    setTodo(e.target.value);
  };

  const submitHandle = (e) => {
    // Edit if id
    // e.preventDefault();
    if (id) {
      API.put(`/todo/${id}`, { text: todo })
        .then(() => {
          M.toast({
            html: "Changes saved!",
            displayLength: 1300,
            classes: "green white-text",
            outDuration: 0.5,
          });
          getTodos();
        })
        .catch((e) => {
          M.toast({
            html: "CSomething went wrong!",
            displayLength: 1300,
            classes: "red white-text",
            outDuration: 0.5,
          });
          console.log(e);
        });
      // setTodos(copyTodos);
    } else {
      API.post("/new-todo", {
        text: capitalizeFirstLetter(todo),
        id: uuidv4(),
        completed: false,
        timestamp: moment(),
      })
        .then((r) => {
          M.toast({
            html: "Todo added!",
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
    }

    setTodo("");
    navigate("/");
  };
  // Logika za complete task na dugme

  return (
    <div className="container row form  ">
      <div className="input-field col s10 m10 l10">
        <input
          placeholder="Type something .."
          ref={inputRef}
          value={todo}
          onKeyPress={handleKey}
          onChange={inputHandle}
        ></input>
      </div>
      <div className="col s2 m2 l2">
        <i
          onClick={(e) => {
            submitHandle(e);
          }}
          className="hover medium   material-icons blue-text lighten-2"
        >
          {id ? "save" : "add_circle_outline"}
        </i>
      </div>
    </div>
  );
}

export default TodoForm;
