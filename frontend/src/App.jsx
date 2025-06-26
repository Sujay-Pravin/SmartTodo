import {AutoAwesome, Logout} from '@mui/icons-material';
import './index.css';
import Todo from './components/todo_component/Todo'
import {useState, useEffect} from 'react'
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'


const App = () => {
    
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/'); // redirect if not logged in
  }, []);


  const [wanted,setWanted] = useState(0)
  const [isTodoDetailed, setIsToDoDetailed] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [isCreateTodo, setIsCreateTodo] = useState(false);
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className='sider-top'>
          <Logout onClick={() => {
            if(window.confirm('Are you sure you want to log out?')){
              googleLogout();                    // Google's logout
              localStorage.removeItem('user');  // clear your session
              window.location.href = '/';       // go back to login
            }
            else{
              ""
            }
          }} 
          className='Logout-btn'/>

          {/* <AutoAwesome className="ai-icon" /> */}

        </div>
        <nav className="nav-links">
          <a   onClick={()=>{
              setWanted(0)
              setIsToDoDetailed(false)
              setSelectedTodo(false)
              setIsCreateTodo(false)
            }}>Active</a>
          <a onClick={()=>{
              setWanted(1)
              setIsToDoDetailed(false)
              setSelectedTodo(false)
              setIsCreateTodo(false)
            }}>Completed</a>
          <a onClick={()=>{
              setWanted(-1)
              setIsToDoDetailed(false)
              setSelectedTodo(false)
              setIsCreateTodo(false)
            }}>All</a>
        </nav>
        <div></div>
      </aside>

      <main className="main-content">
        <Todo 
          want={wanted}
          isTodoDetailed={isTodoDetailed}
          setIsToDoDetailed={setIsToDoDetailed}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          isCreateTodo={isCreateTodo}
          setIsCreateTodo={setIsCreateTodo}
        ></Todo>
      </main>
    </div>
  );
};

export default App;
