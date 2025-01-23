import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Button, FormControl } from "react-bootstrap";
import style from "./AddTodoForm.module.css";

interface Todo {
  id: string;
  title: string;
  status: any;
}

interface AddTodoProps {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const AddTodo: React.FC<AddTodoProps> = ({ todo, setTodo }) => {
  const [value, setValue] = useState<string>("");

  function saveTodo() {
    if (value) {
      setTodo([
        ...todo,
        {
          id: uuidv4(),
          title: value,
          status: false,
        },
      ]);
      setValue("");
    }
  }

  return (
    <Row>
      <Col className={style.addTodoForm}>
        <FormControl
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></FormControl>
        <Button onClick={saveTodo} className={style.btn1}>
          Сreate
        </Button>
      </Col>
    </Row>
  );
};

export default AddTodo;
