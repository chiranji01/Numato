// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="first" />
      <form id="homeForm">
        <h2 id="a">Numato</h2>
        <h2 id="b">Space Math Mission</h2>
        <Link to="/login">
          <button id="login-btn">Login</button>
        </Link>
        <Link to="/register">
          <button id="register-btn">Sign Up</button>
        </Link>
        <Link to="/instructions">
          <button id="instructions-btn">Instructions</button>
        </Link>
      </form>
    </div>
  );
};

export default Home;
