// IMPORTS //
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { API } from "../services/api";
import { showSnackbar } from "../common/functions";

const TodoForm = ({ getTodos, todos }) => {
  const [todo, setTodo] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef();

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
  // Back on backspace
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    });
  }, [navigate]);

  // If there is an id on component mount, sets input value to todo text
  useEffect(() => {
    if (id) {
      const editItem = todos.find((item) => item.id === id);
      setTodo(editItem.text);
      inputRef.current.focus();
    }
    inputRef.current.focus();
  }, [todos, id]);

  // Sets todo on input change
  const inputHandle = (e) => {
    setTodo(e.target.value);
  };

  // Submits a new todo or if there is an id edits that one
  const submitHandle = (e) => {
    // Disable sending empty todo
    if (todo.trim().length === 0) {
      showSnackbar("Please enter a value", "error");
      return;
    }
    // EDIT
    if (id) {
      API.put(`/todo/${id}`, { text: todo })
        .then(() => {
          showSnackbar("Successfully updated");
          getTodos();
        })
        .catch((e) => {
          showSnackbar("Something went wrong", "error");
          console.log(e);
        });
    }

    // SUBMIT
    else {
      API.post("/new-todo", {
        text: capitalizeFirstLetter(todo),
        id: uuidv4(),
        completed: false,
        timestamp: moment(),
      })
        .then((r) => {
          showSnackbar("Todo added");
          getTodos();
        })
        .catch((e) => {
          console.log(e);
          showSnackbar("Something went wrong", "error");
        });
    }

    setTodo("");
    navigate("/");
  };
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
};

export default TodoForm;
