import './TodoList.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = ({want, todos, setIsToDoDetailed, setCurrTodoId, setSelectedTodo, fetchTodos, setIsCreateTodo }) => {
    
  const openTodoDetailed = (data) => {
    setIsToDoDetailed(true)
    setCurrTodoId(data.id)
    setSelectedTodo(data)
  }

  const handleComplete = async (todo, e) => {
    e.stopPropagation(); // prevent triggering openTodoDetailed
    if (!window.confirm('Are you sure you want to complete this todo?')) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/set/completed/${todo.id}`, {
        method: 'POST'
      });

      if (res.ok) {
        toast.success('Todo marked as completed!');
        fetchTodos(); 
      } else {
        const data = await res.json();
        toast.error('Update failed: ' + data.message);
      }
    } catch (err) {
      toast.error('Error completing todo: ' + err.message);
    }
  };

  async function handleSchedule(todo)  {
    const up_todo = {
      'summary' : todo.title,
      'description' : todo.description,
      'start':{
        'dateTime' : new Date(todo.created_on).toISOString(),
        'timeZone' : Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end':{
        'dateTime' : new Date(todo.todo_time).toISOString(),
        'timeZone' : Intl.DateTimeFormat().resolvedOptions().timeZone
      },
    }
    // Optimistically update UI
    todo.is_scheduled = true;
    try {
      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("google_access_token"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(up_todo)
      });
      if (!res.ok) {
        todo.is_scheduled = false; // revert if failed
        const error = await res.text();
        throw new Error(error);
      }
      await fetch(`http://127.0.0.1:5000/set/scheduled/${todo.id}`, {
        method: "POST"
      });
      toast.success("Event created successfully!!!");
      fetchTodos(); // refresh from backend
    } catch (err) {
      todo.is_scheduled = false; // revert if failed
      toast.error("Failed to create event: " + err.message);
    }
  }

  return (
    <div className="todo-container">
      <ToastContainer />
      <h2 className="todo-title">My Todo List</h2>
      <button onClick={() => setIsCreateTodo(true)}>Create Todo</button>
      
      {todos.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        <div className="todo-list">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'todo-completed' : 'todo-pending'}`}
              onClick={() => openTodoDetailed(todo)}
            >
              {want===0?<button
                className="schedule-btn"
                disabled={todo.is_scheduled}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSchedule(todo);
                }}
              >
                {todo.is_scheduled ? "Scheduled" : "Schedule"}
              </button>:""}
              <div>
                <h3>{todo.title}</h3>
                <p>
                  {todo.description.length > 50
                    ? `${todo.description.slice(0, 50)}...`
                    : todo.description}
                </p>
              </div>

              <div className="todo-meta-list">
                <div className="label">Created:</div>
                <div className="value">
                  {new Date(todo.created_on).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </div>

                <div className="label">Due:</div>
                <div className="value">
                  {todo.todo_time &&
                    new Date(todo.todo_time).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                </div>

                <div className="label">Status:</div>
                <div className="value">
                  {todo.completed ? '✅ Completed' : (
                    <button onClick={(e) => handleComplete(todo, e)}>Complete it</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList
