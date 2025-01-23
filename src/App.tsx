import "./App.css";
import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/ToDoList/ToDoList";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Container } from "react-bootstrap";
import "./index.css";

interface TodoItem {
  id: string;
  title: string;
  status: boolean;
}

const App: React.FC = () => {
  const [todo, setTodo] = useState([
    {
      id: uuid(),
      title: "first todo",
      status: true,
    },
    {
      id: uuid(),
      title: "second todo",
      status: false,
    },
    {
      id: uuid(),
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
};

export default App;
