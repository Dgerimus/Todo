import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTodo from "./AddTodo";

describe("AddTodo - Добавление новой задачи", () => {
  it("добавляет новую задачу при вводе текста и клике на кнопку 'Сreate'", () => {
    const mockSetTodo = jest.fn();
    const todoMock = [
      { id: "1", title: "Task 1", status: false },
      { id: "2", title: "Task 2", status: true },
    ];

    render(<AddTodo todo={todoMock} setTodo={mockSetTodo} />);

    // Находим поле ввода
    const input = screen.getByPlaceholderText("What needs to be done?");
    expect(input).toBeInTheDocument();

    // Вводим текст в поле
    fireEvent.change(input, { target: { value: "New Task" } });

    // Проверяем, что текст обновился
    expect(input).toHaveValue("New Task");

    // Находим кнопку 'Сreate'
    const createButton = screen.getByRole("button", { name: /create/i });
    expect(createButton).toBeInTheDocument();

    // Кликаем на кнопку
    fireEvent.click(createButton);

    // Проверяем, что setTodo вызвался с новой задачей
    expect(mockSetTodo).toHaveBeenCalledWith([
      ...todoMock,
      expect.objectContaining({
        title: "New Task",
        status: false,
      }),
    ]);

    // Проверяем, что поле ввода очищено
    expect(input).toHaveValue("");
  });

  it("не добавляет задачу, если поле ввода пустое", () => {
    const mockSetTodo = jest.fn();
    const todoMock = [
      { id: "1", title: "Task 1", status: false },
      { id: "2", title: "Task 2", status: true },
    ];

    render(<AddTodo todo={todoMock} setTodo={mockSetTodo} />);

    // Находим кнопку 'Сreate'
    const createButton = screen.getByRole("button", { name: /create/i });
    expect(createButton).toBeInTheDocument();

    // Кликаем на кнопку без ввода текста
    fireEvent.click(createButton);

    // Проверяем, что setTodo не вызвался
    expect(mockSetTodo).not.toHaveBeenCalled();
  });
});
