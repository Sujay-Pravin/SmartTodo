import { useState, useEffect } from 'react';
import './Todo.css';
import TodoList from '../todo_list/TodoList';
import TodoDetail from '../todo_detailed/TodoDetail';
import CreateTodo from '../create_todo/CreateTodo';

const Todo = ({ want, isTodoDetailed, setIsToDoDetailed, selectedTodo, setSelectedTodo, isCreateTodo, setIsCreateTodo}) => {
  const [todos, setTodos] = useState([]);
  const [currTodoId, setCurrTodoId] = useState(-1);
  

  useEffect(() => {
    fetchTodos();
  }, [want]); // Refresh list when filter changes

  const fetchTodos = async () => {
    let url = 'http://127.0.0.1:5000/get/not_completed';
    if (want === 1) {
        url = 'http://127.0.0.1:5000/get/completed';
    } else if (want === -1) {
        url = 'http://127.0.0.1:5000/get/todo';
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTodos(data.todos);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  return (
    <>
      {!isCreateTodo ? (
        !isTodoDetailed ? (
          <TodoList
            todos={todos}
            setIsToDoDetailed={setIsToDoDetailed}
            setCurrTodoId={setCurrTodoId}
            setSelectedTodo={setSelectedTodo}
            fetchTodos={fetchTodos}
            setIsCreateTodo={setIsCreateTodo}
            want = {want}
          />
        ) : (
          <TodoDetail
            isTodoDetailed={isTodoDetailed}
            selectedTodo={selectedTodo}
            currTodoId={currTodoId}
            setIsToDoDetailed={setIsToDoDetailed}
            fetchTodos={fetchTodos}
          />
        )
      ) : (
        <CreateTodo
          setIsCreateTodo={setIsCreateTodo}
          fetchTodos={fetchTodos}
        />
      )}
    </>
  );
};

export default Todo;
