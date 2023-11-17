import React, { useState, useEffect } from 'react';
import './game.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import audioFile from '../../audioFile.mp3'; 
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");

const TomatoGame = () => {
  
  const [quest, setQuest] = useState(''); 
  const [solution, setSolution] = useState(-1); 
  const [input, setInput] = useState(''); 
  const [note, setNote] = useState('Enter your answer.'); 
  const [score, setScore] = useState(0); 
  const [seconds, setSeconds] = useState(30); 
  const [audio] = useState(new Audio(audioFile)); 
  const [isMuted, setIsMuted] = useState(false); 
  const navigate = useNavigate();

  // Fetches a new question image from the API
  const fetchImage = async () => {
    try {
      const response = await fetch('https://marcconrad.com/uob/tomato/api.php');
      if (response.ok) {
        const data = await response.text();
        startQuest(data);
      } else {
        console.error('Failed to fetch image from the API.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    const handlePlay = () => {
      audio.loop = true;
      audio.volume = isMuted ? 0 : 1;
      audio.play();
    };
    const handleClick = () => {
      document.removeEventListener('click', handleClick);
      handlePlay();
    };
    document.addEventListener('click', handleClick);
    return () => {
      audio.pause();
      document.removeEventListener('click', handleClick);
    };
  }, [audio, isMuted]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        clearInterval(timer);
        handleGameOver();
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    const onPageLoad = () => {
      var isLogged = ReactSession.get("isLogged");
      if(!isLogged) {
        window.alert("Not Logged In");
        navigate("/login");
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  const startQuest = (data) => {
    try {
      const parsed = JSON.parse(data);
      setQuest(parsed.question);
      setSolution(parsed.solution);

      if (parsed.question) {
        setNote('Ready?');
      } else {
        console.log('Image URL not found in the API response.');
      }
    } catch (error) {
      console.error('Error parsing JSON response:', error);
    }
  };

  const handleInput = () => {
    if (input === solution.toString()) {
      setNote('Correct!');
      updateScore(true);
    } else {
      setNote('Not Correct!');
    }
  };

  const updateScore = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleGameOver = () => {
    setNote(`Game over! Your final score is ${score}.`);
  };
 
  const newGame = () => {
    setInput('');
    setNote('Enter your answer.');
    fetchImage();
    setSeconds(30); 
  };

  const handleTryAgain = () => {
    setInput('');
    setNote('Enter your answer.');
    fetchImage();
    setSeconds(30); 
    setScore(0); 
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  return (
    <div>
      <Navbar />
      <div className="bg">
        <div className="img" />
        <div id="question-image">
          <img src={quest} alt="Question Image" id="quest" className="color-image" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleInput}
          id="input"
        />
        <p id="note">{note}</p>
        {seconds > 0 ? (
          <button className="next-btn" onClick={newGame}>
            Next
          </button>
        ) : (
          <div>
            <button className="try-again-btn" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        )}
        <button className="mute-btn" onClick={handleMuteToggle}>
          {isMuted ? ' 🔇' : ' 🔊'}
        </button>
        <p id="timer">Time left: {seconds} seconds</p>
        <p id="score">Score: {score}</p>
      </div>
    </div>
  );
};

export default TomatoGame;
