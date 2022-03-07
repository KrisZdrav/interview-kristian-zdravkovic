import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { API } from "./services/api";

function App() {
  const [todos, setTodos] = useState([]);

  // Get todos
  const getTodos = () => {
    API.get("/todos").then(({ data }) => {
      data.todos.sort((a, b) => {
        return a.completed - b.completed;
      });
      setTodos(data.todos);
    });
  };

  // Call on first mount
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
