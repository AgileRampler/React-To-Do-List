import React, { useEffect, useRef, useState } from "react";
import to_do from "../assets/checklist.gif";
import Todoitems from "./Todoitems.jsx";

function Todo() {
  const inputRef = useRef(null);

  // Load todos from localStorage
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Add Todo
  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompelte: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };

  // Toggle Complete
  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompelte: !todo.isCompelte }
          : todo
      )
    );
  };

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div
      className="
        bg-white
        w-full
        sm:w-11/12
        md:w-3/4
        lg:w-1/3
        max-w-md
        mx-auto
        flex
        flex-col
        p-4
        sm:p-6
        min-h-[550px]
        rounded-xl
        shadow-lg
      "
    >
      {/* Title */}
      <div className="flex items-center mt-5 gap-2">
        <img className="w-8" src={to_do} alt="todo icon" />
        <h1 className="text-2xl sm:text-3xl font-semibold">
          To-Do List
        </h1>
      </div>

      {/* Input Box */}
      <div className="flex flex-col sm:flex-row items-center my-7 bg-gray-200 rounded-full overflow-hidden">
        <input
          ref={inputRef}
          className="
            bg-transparent
            border-0
            outline-none
            flex-1
            h-14
            px-5
            w-full
            placeholder:text-slate-600
          "
          type="text"
          placeholder="Add Your Task"
        />

        <button
          onClick={add}
          className="
            bg-orange-600
            w-full
            sm:w-32
            h-14
            text-white
            text-lg
            font-medium
            cursor-pointer
          "
        >
          ADD +
        </button>
      </div>

      {/* Todo List */}
      <div className="flex flex-col gap-3">
        {todoList.map((item) => (
          <Todoitems
            key={item.id}
            text={item.text}
            id={item.id}
            isCompelte={item.isCompelte}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;
