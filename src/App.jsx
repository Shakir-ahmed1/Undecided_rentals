import './App.css'
import NavBar from './components/NavBar/NavBar'
import {Routes, Route} from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './components/Home/Home';
import UserProfile from './components/User/UserProfile';
import Footer from './components/Footer/Footer';
import Message from './components/Message/Message';
import './components/Map/Map.css'
import { DataProvider } from './context/DataContext';

const App = () => {

  return (
    <>
      <main>
        <DataProvider>
          <GoogleOAuthProvider clientId='83934067217-5vccs2a7gbb49vl6dh77p0c9npobhvjk.apps.googleusercontent.com'>
            <NavBar />
            <Routes>
              <Route path='/' exact element={<Home />}/>
              <Route path='profile/:userId' element={<UserProfile />} />
              <Route path='/register' exact element={<Register />}/>
              <Route path='/login' exact element={<Login />}/>
              <Route path='/messages/:userId' element={<Message />} />
            </Routes>
            <Footer />
          </GoogleOAuthProvider>
        </DataProvider>
      </main>
    </>
  )
}

export default App