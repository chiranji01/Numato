import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../../components/preloader/Preloader';
import './home.css';

const Home = () => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setContentLoaded(true);
    }, 10000); 

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div>
      {!contentLoaded ? (
        <Preloader />
      ) : (
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
      )}
    </div>
  );
};

export default Home;
