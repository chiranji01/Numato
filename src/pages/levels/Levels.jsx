import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './levels.css';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType('localStorage');

const Levels = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const onPageLoad = () => {
      var isLogged = ReactSession.get('isLogged');
      if (!isLogged) {
        window.alert('Not Logged In');
        navigate('/login');
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <div className="levels">
    <div className="img" />
    <form id="levelForm">
      <h2 id="d">Numato</h2>
      <h2 id="e">Space Math Mission</h2>
      <h2 id="c">Levels</h2>
      <Link to="/game">
        <button id="Easy-btn">Level 1 - Simple</button>
      </Link>
      <Link to="/game2">
        <button id="Medium-btn">Level 2 - Average</button>
      </Link>
      <Link to="/game3">
        <button id="Hard-btn">Level 3 - Difficult</button>
      </Link>
    </form>
  </div>
  )
}

export default Levels