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
import DataContext from './context/DataContext';
import {  useSelector, useDispatch } from 'react-redux'
import { useEffect, useContext } from 'react';
import { getRentalData } from './actions/rentals';
import MyRentals from "./components/MyRentals/MyRentals"
import ScrollButton from '../src/components/ScrollButton/ScrollButton'
import HouseDisplay from './components/HouseDisplay/HouseDisplay';

const App = () => {
  const dispatch = useDispatch();
  const {  rentals, setRentals } = useContext(DataContext)
  const rentDetails = useSelector((state) => state.rentals.getAllRentals)
  // console.log('here is the rentals', rentDetails)

  // useEffect(() => {
  //   dispatch(getRentalData(bounds?.sw, bounds?.ne))
  // },[bounds])

  useEffect(() => {
    // dispatch({ type: LOADING });
    dispatch(getRentalData())
  },[])
  
  useEffect(() => {
    setRentals(rentDetails)
  }, [rentDetails])


  return (
    <>
      <main>
          <GoogleOAuthProvider clientId='83934067217-5vccs2a7gbb49vl6dh77p0c9npobhvjk.apps.googleusercontent.com'>
            <NavBar />
            <Routes>
              <Route path='/' exact element={<Home />}/>
              <Route path='profile/:userId' element={<UserProfile />} />
              <Route path='/register' exact element={<Register />}/>
              <Route path='/house/:houseId' exact element={<Home/>} />
              <Route path='/my_rentals' exact element={<MyRentals/>} />
              <Route path='/my_rentals/:houseId' exact element={<MyRentals/>} />
              <Route path='/houseDisplay/:houseId' exact element={<HouseDisplay rentals={rentals}/>} />
              <Route path='/login' exact element={<Login />}/>
              <Route path='/messages/:userId' element={<Message />} />
              <Route path='contact_us' element={<Contact />} />
            </Routes>
            <ScrollButton />
            <Footer />
          </GoogleOAuthProvider>
      </main>
    </>
  )
}

export default App