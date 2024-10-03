import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // navigate to another page using react router

function Timer() {
  const [secondsRemaining, setSecondsRemaining] = useState(30); // Initial seconds (30 seconds)
  const navigate = useNavigate();

  useEffect(() => {
    // Create interval to update the timer every second
    const timer = setInterval(() => {
      // Decrement secs remaining, make sure it doesn't go below 0
      setSecondsRemaining(prevSeconds => Math.max(0, prevSeconds - 1));
    }, 1000); // revise to 1000ms when not testing 

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Navigate to '/score' when the timer reaches 0
    if (secondsRemaining === 0) {
      navigate('/score');
    }
  }, [secondsRemaining]); // Dependency on secondsRemaining

  // Function to format into mins:secs
  const formatTime = (seconds) => {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    // where necessary, pad minutes and seconds with leading zeros
    return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
  };

  return (
    <div className="countdown-timer">
      {secondsRemaining === 0 ? (
        <p>Time's Up!</p>
      ) : (
        <p>Time Left: {formatTime(secondsRemaining)}</p>
      )}
    </div>
  );
}

export default Timer;