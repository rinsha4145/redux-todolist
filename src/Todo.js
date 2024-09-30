// src/ToDoApp.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from './todoSlice';
import './App.css'


const ToDoApp = () => {
    const [inputValue, setInputValue] = useState('');
    const [editMode, setEditMode] = useState(null); // Tracks which todo is in edit mode
    const [editInputValue, setEditInputValue] = useState(''); // Stores the text for the todo being edited
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
  
    const handleAddTodo = () => {
      if (inputValue.trim()) {
        dispatch(addTodo(inputValue));
        setInputValue('');
      }
    };
  
    // When clicking Edit, set the edit mode and the input field to the current todo's text
    const handleEditClick = (todo) => {
      setEditMode(todo.id);
      setEditInputValue(todo.text); // Initialize with the current todo text
    };
  
    const handleEditTodo = (id) => {
      if (editInputValue.trim()) {
        dispatch(editTodo({ id, newText: editInputValue }));
        setEditMode(null); // Exit edit mode after saving
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
                  {/* Show input field when in edit mode */}
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
                  <button onClick={() => handleEditClick(todo)}>Edit</button>
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