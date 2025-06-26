import React, { useState, useEffect } from 'react';
import './TodoDetail.css';
import { ArrowBackIosRounded, EditNote, Delete } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoDetail = ({ currTodoId, isTodoDetailed, selectedTodo, setIsToDoDetailed, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    if (selectedTodo) {
      setEditedTitle(selectedTodo.title);
      setEditedDescription(selectedTodo.description);
    }
  }, [selectedTodo]);

  if (!selectedTodo || !isTodoDetailed) return null;

  const formattedCreatedDate = new Date(selectedTodo.created_on).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedDueDate = new Date(selectedTodo.todo_time).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // PATCH handler
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/update/todo/${selectedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription
        })
      });

      if (res.ok) {
        toast.success('Todo updated successfully');
        setIsEditing(false);
        fetchTodos()
        setIsToDoDetailed(false);
      } else {
        const data = await res.json();
        toast.error('Update failed: ' + data.message);
      }
    } catch (err) {
      toast.error('Error updating todo: ' + err.message);
    }
  };

  // DELETE handler
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    try {
      const res = await fetch(`http://localhost:5000/delete/todo/${selectedTodo.id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success('Todo deleted successfully');
        fetchTodos()
        setIsToDoDetailed(false);
      } else {
        const data = await res.json();
        toast.error('Delete failed: ' + data.message);
      }
    } catch (err) {
      toast.error('Error deleting todo: ' + err.message);
    }
  };

  return (
    <div className="todo-detail-container">
      <ToastContainer />
      <div className="todo-header">
        <div className="head-group-container">
          <ArrowBackIosRounded
            className="back-icon"
            sx={{ fontSize: 40, cursor: 'pointer' }}
            onClick={() => setIsToDoDetailed(false)}
          />
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="edit-title-input"
            />
          ) : (
            <h1>{selectedTodo.title}</h1>
          )}
        </div>

        <div className="head-group-container">
          <div className="todo-meta">
            <div className="label">Created:</div>
            <div className="value">{formattedCreatedDate}</div>

            <div className="label">Due:</div>
            <div className="value">{formattedDueDate}</div>

            <div className="label">Status:</div>
            <div className="value">
              {selectedTodo.completed ? '✅ Completed' : '⏳ Pending'}
            </div>
          </div>

          <div className="options">
            {
            !selectedTodo.completed?<EditNote
              sx={{ fontSize: 40, cursor: 'pointer' }}
              onClick={() => setIsEditing(!isEditing)}
            />: 
            ""
            }
            <Delete
              sx={{ fontSize: 40, cursor: 'pointer' }}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>

      <hr className="todo-divider" />

      <div className="edit-section">
        {isEditing ? (
          <>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="edit-description-input"
            />
            <button onClick={handleUpdate}>Save</button>
          </>
        ) : (
          <p className="todo-description">{selectedTodo.description}</p>
        )}
      </div>
    </div>
  );
};

export default TodoDetail;
