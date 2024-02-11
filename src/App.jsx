import './App.css'
import NavBar from './components/AppBar/AppBar'
import {Routes, Route} from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/api/users/register' exact element={<Register />}/>
        <Route path='/api/users/login' exact element={<Login />}/>
      </Routes>
    </>
  )
}

export default App