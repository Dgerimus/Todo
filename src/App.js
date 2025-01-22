import "./App.css";
import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/ToDoList/ToDoList";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Container } from "react-bootstrap";
import "./index.css";

function App() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "first todo",
      status: true,
    },
    {
      id: 2,
      title: "second todo",
      status: false,
    },
    {
      id: 3,
      title: "third todo",
      status: true,
    },
  ]);

  return (
    <Container>
      <Header />
      <AddTodo todo={todo} setTodo={setTodo} />
      <TodoList todo={todo} setTodo={setTodo} />
    </Container>
  );
}

export default App;
