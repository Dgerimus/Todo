import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import {
  MdOutlineRadioButtonUnchecked,
  MdCheckCircle,
  MdSaveAs,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import style from "./TodoList.module.css";

function TodoList({ todo, setTodo }) {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState(todo);

  useEffect(() => {
    setFiltered(todo);
  }, [todo]);

  function todoFilter(status) {
    if (status === "all") {
      setFiltered(todo);
    } else {
      let newTodo = [...todo].filter((item) => item.status === status);
      setFiltered(newTodo);
    }
  }

  function deleteTodo(id) {
    let newTodo = [...todo].filter((item) => item.id != id);
    setTodo(newTodo);
  }
  function statusTodo(id) {
    let newTodo = [...todo].filter((item) => {
      if (item.id == id) {
        item.status = !item.status;
      }
      return item;
    });
    setTodo(newTodo);
  }
  function editTodo(id, title) {
    setEdit(id);
    setValue(title);
  }
  function saveTodo(id) {
    let newTodo = [...todo].map((item) => {
      if (item.id == id) {
        item.title = value;
      }
      return item;
    });
    setTodo(newTodo);
    setEdit(null);
  }

  return (
    <div>
      <Row>
        <Col className={style.filter}>
          <div
            class="btn-group"
            role="group"
            aria-label="Простой пример"
            className={style.grbtns}
          >
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => todoFilter("all")}
            >
              Все
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => todoFilter(false)}
            >
              Открытые
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => todoFilter(true)}
            >
              Закрытые
            </button>
          </div>
        </Col>
      </Row>
      {filtered.map((item) => (
        <div key={item.id} className={style.listItems}>
          {edit == item.id ? (
            <div>
              <input onChange={(e) => setValue(e.target.value)} value={value} />
            </div>
          ) : (
            <div>
              <Button onClick={() => statusTodo(item.id)} className={style.btn}>
                {item.status == true ? (
                  <MdCheckCircle size="2em" color="wite" />
                ) : (
                  <MdOutlineRadioButtonUnchecked size="2em" />
                )}
              </Button>

              <span className={item.status ? style.close : ""}>
                {item.title}
              </span>
            </div>
          )}

          {edit == item.id ? (
            <div>
              <Button onClick={() => saveTodo(item.id)}>
                <MdSaveAs />
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => editTodo(item.id, item.title)}
                className={style.btn}
              >
                <MdEdit />
              </Button>
              <Button onClick={() => deleteTodo(item.id)}>
                <MdDelete />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
