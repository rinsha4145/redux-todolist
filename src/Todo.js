// src/ToDoApp.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from './todoSlice';
import './App.css'

const ToDoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const handleEditTodo = (id) => {
    if (editInputValue.trim()) {
      dispatch(editTodo({ id, newText: editInputValue }));
      setEditMode(null);
      setEditInputValue('');
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTodo}>Add ToDo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editMode === todo.id ? (
              <>
                <input
                  type="text"
                  value={editInputValue}
                  onChange={(e) => setEditInputValue(e.target.value)}
                />
                <button onClick={() => handleEditTodo(todo.id)}>Save</button>
                <button onClick={() => setEditMode(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => dispatch(toggleTodo(todo.id))}
                >
                  {todo.text}
                </span>
                <button onClick={() => setEditMode(todo.id)}>Edit</button>
                <button onClick={() => dispatch(deleteTodo(todo.id))}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;
