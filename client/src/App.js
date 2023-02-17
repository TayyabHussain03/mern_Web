import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Registration from './components/Registration';
import Contactus from './components/Contactus';
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';
import { reducer } from './Reducer/useReducer'

export const UserContext = createContext()

function App() {
  const initialState = null
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contactus />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
