// Uvoz expressa
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import pkg from "lodash";
const { isEmpty } = pkg;
// const bodyParser = require("body-parser");
// const cors = require("cors");
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

const PORT = 5000;
const HOST = "0.0.0.0";

app.use(express.json());

const defaultState = { todos: [] };

// Read data from JSON file, this will set db.data content
await db.read();

// If dbjson.json doesn't exist, db.data will be null
// Set default data
db.data ||= defaultState;
// ????????????????????//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// GET
app.get("/api/todos", (req, res) => {
  return res.json(db.data);
});

// POST
app.post("/api/new-todo", (req, res) => {
  db.data.todos.push(req.body);
  db.write();
  return res.json(db.data.todos);
});

// Updatuje listu
// app.post("/api/todos", (req, res) => {
//   todos = [...req.body];
//   res.json(todos);
// });

//DELETE
app.delete("/api/todo/:id", (req, res) => {
  const { id } = req.params;

  let copyTodos = [...db.data.todos];

  const newTodos = copyTodos.filter((element) => element.id !== id);
  db.data.todos = [...newTodos];

  console.log(newTodos);

  db.write();
  // console.log(id);
  return res.json(db.data.todos);
});

// PUT
app.put("/api/todo/:id", (req, res) => {
  const { id } = req.params;
  // If req body is not empty update text
  if (!isEmpty(req.body)) {
    const copyTodos = [...db.data.todos];
    const index = copyTodos.findIndex((item) => item.id === id);
    copyTodos[index].text = req.body.text;
    console.log(`Body nije prazan`);

    db.write();
  }
  // If req body is empty update completed
  else {
    const copyTodos = [...db.data.todos];
    // Iz kog nalazi index itema za uzet ID
    const index = copyTodos.findIndex((item) => item.id === id);
    // Pristupa mu i menja complete status u suprotno
    copyTodos[index].completed = !copyTodos[index].completed;
    console.log(`Body je prazan`);
    db.write();
  }
  res.json(db.data.todos);
});

// Listen to the port
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
//
