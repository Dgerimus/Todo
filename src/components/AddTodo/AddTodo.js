import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Button, FormControl } from "react-bootstrap";
import style from "./AddTodoForm.module.css";

function AddTodo({ todo, setTodo }) {
  const [value, setValue] = useState("");

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
          placeholder="Введите задачу"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></FormControl>
        <Button onClick={saveTodo} className={style.btn1}>
          Создать
        </Button>
      </Col>
    </Row>
  );
}

export default AddTodo;
