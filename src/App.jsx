import './App.css'
import NavBar from './components/NavBar/NavBar'
import {Routes, Route} from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  return (
    <>
      <GoogleOAuthProvider clientId='83934067217-5vccs2a7gbb49vl6dh77p0c9npobhvjk.apps.googleusercontent.com'>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/register' exact element={<Register user={user} setUser={setUser}/>}/>
          <Route path='/login' exact element={<Login user={user} setUser={setUser}/>}/>
        </Routes>
      </GoogleOAuthProvider>
    </>
  )
}

export default App