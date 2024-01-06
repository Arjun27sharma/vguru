import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Adjust the path as needed
import Signup from './components/Signup'; // Adjust the path as needed
import Home from './components/Home';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
