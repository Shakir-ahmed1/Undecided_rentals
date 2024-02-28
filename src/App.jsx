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
import Contact from './components/Contact/Contact';
// import DataContext from './context/DataContext';
import {  useSelector, useDispatch } from 'react-redux'
import { useEffect, useContext } from 'react';
import { getRentalData } from './actions/rentals';
// import { getRentalData } from './actions/rentals';

const App = () => {
  const dispatch = useDispatch();
  // const {  bounds, setRentals } = useContext(DataContext)
  const rentDetails = useSelector((state) => state.rentals.getAllRentals)
  console.log('here is all your rentals',rentDetails)

  // useEffect(() => {
  //   dispatch(getRentalData(bounds?.sw, bounds?.ne))
  // },[bounds])

  useEffect(() => {
    dispatch(getRentalData())
  },[])
  
  // useEffect(() => {
  //   setRentals(rentDetails)
  // }, [rentDetails])

  return (
    <>
      <main>
          <GoogleOAuthProvider clientId='83934067217-5vccs2a7gbb49vl6dh77p0c9npobhvjk.apps.googleusercontent.com'>
            <NavBar />
            <Routes>
              <Route path='/' exact element={<Home />}/>
              <Route path='profile/:userId' element={<UserProfile />} />
              <Route path='/register' exact element={<Register />}/>
              <Route path='/login' exact element={<Login />}/>
              <Route path='/messages/:userId' element={<Message />} />
              <Route path='contact_us' element={<Contact />} />
            </Routes>
            <Footer />
          </GoogleOAuthProvider>
      </main>
    </>
  )
}

export default App