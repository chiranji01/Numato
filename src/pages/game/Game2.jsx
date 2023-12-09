import React, { useState, useEffect } from 'react';
import './game.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import GameOver from '../../components/gameover/GameOver'; 
import audioFile from '../../audioFile.mp3';
import { getFirestore, collection, addDoc, updateDoc, getDocs, doc } from 'firebase/firestore';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType('localStorage');

const TomatoGame = () => {
  const [quest, setQuest] = useState('');
  const [solution, setSolution] = useState(-1);
  const [input, setInput] = useState('');
  const [note, setNote] = useState('Enter your answer.');
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(25);
  const [audio] = useState(new Audio(audioFile));
  const [isMuted, setIsMuted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false); // New state to track game over
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

  const handleLogout = () => {
    // Clear session data on logout
    ReactSession.set('isLogged', false);
    
    // Remove the session data from local storage
    localStorage.removeItem('_react_session__');

    // Clear other state variables
    setInput('');
    setNote('');
    setScore(0);
    setSeconds(25);

    // Redirect to the login page
    navigate('/login');
  };

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
      updateScore(false);
    }
  };

  const updateScore = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 5);
    } else {
      setScore((prevScore) => Math.max(prevScore - 1, 0));
    }
  };

  const saveScoreToDatabase = async (finalScore) => {
    try {
      const db = getFirestore();
      const scoresCollection = collection(db, 'scores');
      const userEmail = getCookie('email');
  
      // Check if a document with the user's email already exists
      const querySnapshot = await getDocs(scoresCollection);
      const userDoc = querySnapshot.docs.find(doc => doc.data().userEmail === userEmail);
  
      if (userDoc) {
        // If the document exists, update only the score
        await updateDoc(doc(scoresCollection, userDoc.id), {
          score: finalScore,
        });
  
        console.log('Score updated for user:', userEmail);
      } else {
        // If the document doesn't exist, create a new one
        const newDocRef = await addDoc(scoresCollection, {
          userEmail,
          score: finalScore,
          timestamp: new Date(),
        });
  
        console.log('New score document created with ID: ', newDocRef.id);
      }
    } catch (error) {
      console.error('Error saving/updating score to database: ', error);
    }
  };
  
  const handleGameOver = () => {
    // Save the final score to the database
    saveScoreToDatabase(score);
  
    // Set the game over state to true
    setIsGameOver(true);
  };
  
  const newGame = () => {
    setInput('');
    setNote('Enter your answer.');
    fetchImage();
    setSeconds(25);
    setIsGameOver(false); // Reset game over state when starting a new game
  };

  const handleTryAgain = () => {
    setInput('');
    setNote('Enter your answer.');
    fetchImage();
    setSeconds(25);
    setScore(0);
    setIsGameOver(false); // Reset game over state when trying again
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div>
      <Navbar />
      <div className="bg">
        {isGameOver ? (
          <GameOver finalScore={score} handleTryAgain={handleTryAgain} />
        ) : (
          <>
            <div className="img1" />
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
              <div></div>
            )}
            <button className="mute-btn" onClick={handleMuteToggle}>
              {isMuted ? ' 🔇' : ' 🔊'}
            </button>
            <div>
              <p id="timer">Timer : {seconds} s</p>
              <p id="score">Score : {score}</p>
              <p id="level">Level : 1 </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TomatoGame;
