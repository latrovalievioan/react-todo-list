import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import uuidv4 from "../node_modules/uuid/dist/v4";
import "./styles/App.css";

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
    <div id="app">
      <h1 className="title">Todo List</h1>
      <div className="todo-list">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
      <div className="left-todo">
        {todos.filter((todo) => !todo.completed).length} left to do
      </div>
      <div className="add-todo">
        <input ref={todoNameRef} type="text" />
        <div className="buttons">
          <button onClick={handleAddTodo}>Add Todo</button>
          <button onClick={handleClearTodos}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
