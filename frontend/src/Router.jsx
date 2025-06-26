import React from 'react'
import App from './App.jsx'
import {Routes, Route, HashRouter} from 'react-router-dom'
import Login from './components/Login/Login.jsx'

const Router = () => {
  return (
    <HashRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<App/>}/>
        </Routes>
    </HashRouter>
  )
}

export default Router