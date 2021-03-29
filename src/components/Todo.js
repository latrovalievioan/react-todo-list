import React from "react";
import "../styles/Todo.css";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div className="todo">
      <label className="todoLabel">
        <input
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={handleTodoClick}
        />
        <div className="todo-name">{todo.name}</div>
      </label>
    </div>
  );
}
