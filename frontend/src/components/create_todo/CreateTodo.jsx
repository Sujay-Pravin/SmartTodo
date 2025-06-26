import React, { useState } from 'react';
import { ArrowBackIosRounded } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateTodo.css';

const CreateTodo = ({ setIsCreateTodo, fetchTodos }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todoTime, setTodoTime] = useState('');

  const handleCreate = async () => {
    if (!title || !description || !todoTime) {
      toast.error('Please fill out all fields');
      return;
    }

    toast.info('Creating todo...');
    try {
      const res = await fetch('http://localhost:5000/create/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, todo_time: todoTime }),
      });

      if (res.ok) {
        toast.success('Todo created successfully');
        fetchTodos?.();
        setIsCreateTodo(false);
      } else {
        const data = await res.json();
        toast.error('Creation failed: ' + data.message);
      }
    } catch (err) {
      toast.error('Error creating todo: ' + err.message);
    }
  };

  const handleBack = () => {
    toast.info('Cancelled todo creation');
    setIsCreateTodo(false);
  };

  return (
    <div className="create-container">
      <ToastContainer />
      <div className="create-header">
        <ArrowBackIosRounded
          className="back-icon"
          onClick={handleBack}
        />
        <h2>Create New Todo</h2>
      </div>

      <div className="create-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.length === 0) toast.warn('Title is required');
          }}
          className="input-field"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (e.target.value.length === 0) toast.warn('Description is required');
          }}
          className="textarea-field"
        />

        <input
          type="datetime-local"
          value={todoTime}
          onChange={(e) => {
            setTodoTime(e.target.value);
            if (!e.target.value) toast.warn('Due date/time is required');
          }}
          className="input-field"
          onFocus={(e) => e.target.showPicker?.()} 
        />


        <button className="create-button" onClick={handleCreate}>
          Create Todo
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
