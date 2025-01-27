import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./ToDoList";

describe("TodoList - Фильтрация задач", () => {
  const todoMock = [
    { id: "1", title: "Task 1", status: false },
    { id: "2", title: "Task 2", status: true },
  ];

  it("отображает все задачи при нажатии кнопки 'All'", () => {
    render(<TodoList todo={todoMock} setTodo={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /All/i }));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("отображает только невыполненные задачи при нажатии кнопки 'Active'", () => {
    render(<TodoList todo={todoMock} setTodo={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /Active/i }));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).toBeNull();
  });

  it("отображает только выполненные задачи при нажатии кнопки 'Completed'", () => {
    render(<TodoList todo={todoMock} setTodo={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Completed" }));

    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).toBeNull();
  });
});
describe("TodoList - Удаление задачи", () => {
  it("удаляет задачу при клике на кнопку 'удалить' и обновляет отображение", () => {
    const mockSetTodo = jest.fn();

    const todoWithDelete = [
      { id: "1", title: "Task 1", status: false },
      { id: "2", title: "Task 2", status: true },
    ];

    const { rerender } = render(
      <TodoList todo={todoWithDelete} setTodo={mockSetTodo} />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    expect(mockSetTodo).toHaveBeenCalledWith([
      { id: "2", title: "Task 2", status: true },
    ]);

    const updatedTodo = [{ id: "2", title: "Task 2", status: true }];
    rerender(<TodoList todo={updatedTodo} setTodo={mockSetTodo} />);

    expect(screen.queryByText("Task 1")).toBeNull(); // Убедимся, что Task 1 удалена

    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
describe("TodoList - Изменение статуса задачи", () => {
  it("меняет статус задачи при клике на кнопку", () => {
    const mockSetTodo = jest.fn();
    const todoMock = [
      { id: "1", title: "Task 1", status: false },
      { id: "2", title: "Task 2", status: true },
    ];

    render(<TodoList todo={todoMock} setTodo={mockSetTodo} />);

    // Находим кнопку изменения статуса для первой задачи (Task 1)
    const toggleButton = screen.getByRole("button", { name: "statusChange-1" });
    fireEvent.click(toggleButton);

    // Проверяем, что setTodo был вызван с обновленным статусом
    expect(mockSetTodo).toHaveBeenCalledWith([
      { id: "1", title: "Task 1", status: true }, // Статус изменился на true
      { id: "2", title: "Task 2", status: true },
    ]);
  });
});

describe("TodoList - Редактирование задачи", () => {
  it("редактирует задачу", () => {
    const mockSetTodo = jest.fn();
    const todoMock = [
      { id: "1", title: "Task 1", status: false },
      { id: "2", title: "Task 2", status: true },
    ];

    render(<TodoList todo={todoMock} setTodo={mockSetTodo} />);

    // Находим кнопку редактирования для первой задачи (Task 1)
    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    fireEvent.click(editButton);

    // Находим поле ввода и вводим новый текст
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Updated Task 1" } });

    // Находим кнопку сохранения и кликаем
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    // Проверяем, что setTodo был вызван с обновленным текстом
    expect(mockSetTodo).toHaveBeenCalledWith([
      { id: "1", title: "Updated Task 1", status: false }, // Текст обновлен
      { id: "2", title: "Task 2", status: true },
    ]);
  });
});
describe("TodoList - Счётчик оставшихся задач", () => {
  it("отображает корректное количество оставшихся задач", () => {
    const todoMock = [
      { id: "1", title: "Task 1", status: false }, // активная задача
      { id: "2", title: "Task 2", status: true }, // выполненная задача
      { id: "3", title: "Task 3", status: false }, // активная задача
    ];

    render(<TodoList todo={todoMock} setTodo={jest.fn()} />);

    // Находим текст счётчика
    const counterText = screen.getByText(/items left/i);

    // Проверяем, что счётчик отображает корректное значение (2 задачи не выполнены)
    expect(counterText).toHaveTextContent("2 items left");
  });
});
