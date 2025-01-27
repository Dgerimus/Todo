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

interface TodoItem {
  id: string;
  title: string;
  status: boolean;
}

interface TodoListProps {
  todo: TodoItem[];
  setTodo: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todo, setTodo }) => {
  const [edit, setEdit] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");
  const [filtered, setFiltered] = useState<TodoItem[]>(todo);

  useEffect(() => {
    setFiltered(todo);
  }, [todo]);

  const activeTasksCount = todo.filter((item) => !item.status).length;

  const todoFilter = (status: boolean | "all") => {
    if (status === "all") {
      setFiltered(todo);
    } else {
      const newTodo = todo.filter((item) => item.status === status);
      setFiltered(newTodo);
    }
  };

  const deleteTodo = (id: string) => {
    const newTodo = todo.filter((item) => item.id !== id);
    setTodo(newTodo);
  };

  const deleteCompletedTasks = () => {
    const newTodo = todo.filter((item) => !item.status);
    setTodo(newTodo);
  };

  const statusTodo = (id: string) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setTodo(newTodo);
  };
  const editTodo = (id: string, title: string) => {
    setEdit(id);
    setValue(title);
  };
  const saveTodo = (id: string) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, title: value };
      }
      return item;
    });
    setTodo(newTodo);
    setEdit(null);
  };

  return (
    <div>
      <Row>
        <Col className={style.filter}>
          <div
            className={`d-flex align-items-center justify-content-between ${style.grbtns}`}
            role="group"
            aria-label="Простой пример"
          >
            <span className="mr-3">{activeTasksCount} items left</span>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => todoFilter("all")}
              aria-label="All"
            >
              All
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => todoFilter(false)}
              aria-label="Active"
            >
              Active
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => todoFilter(true)}
              aria-label="Completed"
            >
              Completed
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={deleteCompletedTasks}
              aria-label="Clear completed tasks"
            >
              Clear completed
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
              <Button
                onClick={() => statusTodo(item.id)}
                className={style.btn}
                aria-label={`statusChange-${item.id}`}
              >
                {item.status == true ? (
                  <MdCheckCircle size="2em" />
                ) : (
                  <MdOutlineRadioButtonUnchecked size="2em" />
                )}
              </Button>

              <span className={item.status ? style.close : ""}>
                {item.title}
              </span>
            </div>
          )}

          {edit === item.id ? (
            <div>
              <Button onClick={() => saveTodo(item.id)} aria-label="save">
                <MdSaveAs />
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => editTodo(item.id, item.title)}
                className={style.btn}
                aria-label={`edit-${item.id}`}
              >
                <MdEdit />
              </Button>
              <Button onClick={() => deleteTodo(item.id)} aria-label="delete">
                <MdDelete />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
