import React from 'react';
import { Link } from 'react-router-dom';
import './instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <div className="ifirst" />
      <form id="instructForm">
        <h2 id="ia">Numato</h2>
        <h2 id="ib">Space Math Mission </h2>
        <h2 id="ic">- Instructions - </h2>
        <div className="iform-body">
          <h5 className="iform-title">
            Welcome to our instruction page! Here you will find all the
            information you need to get started with this game.
          </h5>
          <h6 className="iform-title">Getting Started:</h6>
          <p className="iform-text">
            <ul>
              <li>
                Create an account: To use the game, you need to create an
                account. Go to our homepage (http://localhost:3000) and
                click on the “Sign Up” button. Fill in your details and click on
                “Create Account”.
              </li>
              <li>
                Login: After creating your account, click on the “Sign In”
                button. Enter your username and password to access your account.
              </li>
              <li>
                Explore: Once you have logged in, you can start playing our
                game. Navigate through the menus to find the features you want
                to use.
              </li>
            </ul>
          </p>

          <h6 className="iform-title">Features:</h6>
          <p className="iform-text">
            <ul>
              <li>
                Game: After logging in, the game page is where you can start
                playing the game. Guess the tomato number and enter it in the input box. The timer is set to 30sec for one single problem. With in the given time you should answer any number of questions.
                You can also mute and unmute the background audio track.
              </li>
              <li>
                Next Question: If you don't know the answer to a
                question, you can click the next button and move on to the next
                question. 
              </li>
              <li>
                Highest Score: After answering the questions until the timer stops your marks will be added to the score board. 
                In there you can see the highest score of the top 3 players of the game.
              </li>
              <li>
                Logout: Click on the “Logout” button located at the top right
                corner of the page to log out from your account and it will navigate you to the login page.
              </li>
            </ul>
          </p>
          <h6 className="iform-footer">We hope this instruction page has been helpful in getting you started with the game.</h6>
        </div>
        <label className="footer">DEVELOP BY CHIRANJI RANAWEERA (2323496)</label>
        
        
        <Link to="/login"> {/* Link to the game page */}
          <button id="play-btn">Start Mission</button>
        </Link>
       
        
    
      </form>
    </div>
  )
}

export default Instructions;

