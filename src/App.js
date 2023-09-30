import React, { useState, useEffect } from 'react';
import './App.css';

const GameTask = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [boxColor, setBoxColor] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(40);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let intervalId;

    const changeBoxColor = () => {
      const colors = ['red', 'green'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBoxColor(randomColor);
    };

    if (gameStarted && !gameOver) {
      changeBoxColor();
      intervalId = setInterval(changeBoxColor, 1500);

      setTimeout(() => {
        clearInterval(intervalId);
        setGameOver(true);
      }, timeRemaining * 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted, gameOver, timeRemaining]);

  const handleBoxClick = () => {
    if (boxColor === 'green' && !gameOver) {
      setScore(score + 1);
      if (score + 1 === getWinningScore()) {
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const getWinningScore = () => {
    switch (difficulty) {
      case 'Easy':
        return 10;
      case 'Medium':
        return 15;
      case 'Hard':
        return 25;
      default:
        return 10;
    }
  };

  const handleStartGame = () => {
    const errors = {};

    if (name.length < 5) {
      errors.name = 'Name should contain more than 5 characters';
    }

    if (!email.includes('@')) {
      errors.email = 'Enter a valid Email id';
    }

    if (mobileNumber.length !== 10) {
      errors.mobileNumber = 'Mobile Number should be 10 characters';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setGameStarted(true);
    }
  };

  const handleTryAgain = () => {
    setGameStarted(false);
    setGameOver(false);
    setTimeRemaining(40);
    setScore(0);
    setName('');
    setEmail('');
    setMobileNumber('');
    setDifficulty('Easy');
    setErrors({});
  };

  return (
    <div className="container">
      <div className="game-container">
        {!gameStarted && !gameOver ? (
          <div>
            <h1>Color Game</h1>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input type="tel" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level:</label>
              <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        ) : (
          gameOver ? (
            <div>
              {score === getWinningScore() ? <h2>You won!</h2> : <h2>Game Over</h2>}
              <button onClick={handleTryAgain}>Try Again</button>
            </div>
          ) : (
            <div>
              <div className="color-box" style={{ backgroundColor: boxColor }} onClick={handleBoxClick}></div>
              <div className="info">
                <h2>Score: {score}</h2>
                <h2>Time Remaining: {timeRemaining}</h2>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GameTask;