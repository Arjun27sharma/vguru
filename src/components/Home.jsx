import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
        <h1>Welcome to VGuru</h1>
      <div className="text-center">
        <Link to="/login" className="btn btn-primary m-2">Login</Link>
        <Link to="/signup" className="btn btn-secondary m-2">Signup</Link>
      </div>
    </div>
  );
}

export default Home;
