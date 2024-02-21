import './App.css'
import NavBar from './components/NavBar/NavBar'
import {Routes, Route} from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from 'react';
import Home from './components/Home/Home';
import UserProfile from './components/User/UserProfile';
import Footer from './components/Footer/Footer';
import Message from './components/Message/Message';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  return (
    <>
      <main>
        <GoogleOAuthProvider clientId='83934067217-5vccs2a7gbb49vl6dh77p0c9npobhvjk.apps.googleusercontent.com'>
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path='/' exact element={<Home />}/>
            <Route path='profile/:userId' element={<UserProfile user={user}/>} />
            <Route path='/register' exact element={<Register user={user} setUser={setUser}/>}/>
            <Route path='/login' exact element={<Login user={user} setUser={setUser}/>}/>
            <Route path='/messages/:userId' element={<Message />} />
          </Routes>
          <Footer />
        </GoogleOAuthProvider>
      </main>
    </>
  )
}

export default App