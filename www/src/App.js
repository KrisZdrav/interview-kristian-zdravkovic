import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import { API } from "./services/api";

function App() {
  const [todos, setTodos] = useState([]);

  // FETCH
  // const getTodos = async () => {
  //   const res = await fetch("http://localhost:5000/api/todos", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const result = res.json();
  //   result.then((r) => {
  //     setTodos(r);
  //   });
  //   console.log("ovo ti je to brate moj", result);
  // };

  const getTodos = () => {
    API.get("/todos").then(({ data }) => {
      console.log(data);
      data.todos.sort((a, b) => {
        return a.completed - b.completed;
      });
      setTodos(data.todos);
    });

    // await API.get("/").then((res) => {
    //   // console.log(res.data);
    //   setTodos(res.data);
    // });
    // .then((err) => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-todo" element={<TodoForm getTodos={getTodos} />} />
        <Route
          path="/"
          element={
            <TodoList todos={todos} getTodos={getTodos} setTodos={setTodos} />
          }
        />

        {/* Params uvodimo nakon / sa :, iz tog url-a izvlacimo ID  */}
        <Route
          path="/edit-todo/:id"
          element={
            <TodoForm setTodos={setTodos} getTodos={getTodos} todos={todos} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Onemoguci dodavanje praznog nota
// Komplet CSS
// Ocisti kod i resi komentare
