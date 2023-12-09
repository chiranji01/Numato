import React from 'react';
import { Link } from 'react-router-dom';
import './gameover.css'; 

const GameOver = ({ finalScore, handleTryAgain }) => {
  return (
    <div className="game-over">
      <form id="game-overForm">
      <h2>Mission Over</h2>
      <p>Your final score is {finalScore}.</p>
      <button className="try-again-btn" onClick={handleTryAgain}>
        Try Again
      </button>
      <Link to="/" className= "back-to-home">Go Back to Home</Link>
      </form>
    </div>
  );
};
export default GameOver;
