import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import uuidv4 from "../node_modules/uuid/dist/v4";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name, completed: false }];
    });
    todoNameRef.current.value = null;
  }

  const handleClearTodos = () => {
    const uncompletedTodos = todos.filter((todo) => {
      return !todo.completed;
    });
    setTodos(uncompletedTodos);
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter((todo) => !todo.completed).length} left to do</div>
    </>
  );
}

export default App;
