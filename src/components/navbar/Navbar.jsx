import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

function Navbar() {
  return (
    <div className="navbar">
      <div className="title">Numato</div>
      <div className="nav-links">
        <Link className="nav-link">High Score</Link>
        <Link to="/instructions" className="nav-link">Instructions</Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Logout</Link>
      </div>
    </div>
  );
}

export default Navbar;
