import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Adjust the path as needed
import Signup from './components/Signup'; // Adjust the path as needed
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import axios from 'axios';
import WordMatchGame from './games/WordMatch';
import ShapeGame from './games/ShapeGame';
import ColorGame from './games/ColorMatch';

function App() {
  const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : 'https://vguru-server.vercel.app';

  const [user, setUser] = useState(null)
  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }
    try {
        const response = await axios.get(`${API_URL}/api/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        setUser(response.data);
    } catch (error) {
        console.error("Error fetching user data:", error.response);
    }}

  useEffect(() => {
    fetchUserDetails() 
  }, [])


  return (

    <BrowserRouter>
    <Navbar user={user}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/game/wordmatch' element={<WordMatchGame />} />
        <Route path='/game/shapematch' element={<ShapeGame />} />
        <Route path='/game/colormatch' element={<ColorGame />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
