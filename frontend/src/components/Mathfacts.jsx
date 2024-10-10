import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect } from 'react';

function Mathfacts(props) {
  // State variables to manage game state
  const [score, setScore] = useState(0);            // track player's score
  const [operation, setOperation] = useState("addition"); // current math operation selected by player
  const [problem, setProblem] = useState("");       // current math problem presented to player
  const [userAnswer, setUserAnswer] = useState(""); // user's input answer
  const [timer, setTimer] = useState(30);           // countdown timer starting at 30 seconds
  const [isGameActive, setIsGameActive] = useState(false); // track if game is currently active
  const [isFinalView, setIsFinalView] = useState(false);   // tracks whether to show the final score view
  const [hasPosted, setHasPosted] = useState(false);
  const [messages, setMessages] = useState([]);

  // generate a random integer between low and high (inclusive)
  const randInt = (low, high) => Math.floor(Math.random() * (high - low + 1) + low);

  const [tracking, setTracking] = useState({
    math_user_id: props.sessionId,
    math_score: score,
    math_operation: operation
})

console.log(props.sessionId);

  // effect to manage the countdown timer
  useEffect(() => {
    if (isGameActive && timer > 0) {
      // set interval to decrease the timer every second
      const timerId = setInterval(() => {
        setTimer(prev => prev - 1); // Decrease the timer
      }, 1000);

      // cleanup function to clear the interval on component unmount or when conditions change
      return () => clearInterval(timerId);
    } else if (timer === 0) {
      endGame(); // end the game when the timer reaches zero
      
      if (!hasPosted) {
        fetchData();
      }
     
    }
  }, [isGameActive, timer]); // Depend on game active state and timer

  async function fetchData() {
    const apiURL = 'http://localhost:8888/phpreact/frontend/backend/math-tracking.php';
    const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tracking)
    })
    const data = await response.json();
    setHasPosted(true);
    setMessages(data);
}


  // create a function to start the game
  const startGame = () => {
    setIsGameActive(true); // Activate the game state
    setScore(0);           // Reset the score
    setTimer(30);         // Reset the timer
    createMathProblem();   // Generate the first math problem
  };

  // create a function to end the game
  const endGame = () => {
    setIsGameActive(false); // Deactivate game state
    setIsFinalView(true);   // Show final score view
  };

  // function creating a new math problem based on the selected operation
  const createMathProblem = () => {
    let num1 = randInt(1, 10); // Generate a random number between 1 and 10
    let num2 = randInt(1, 10); // Generate another random number

    let newProblem; // let variable to store the generated problem, 

    // switch statement to create the problem based on the selected operation
    switch (operation) {
      case "addition":
        newProblem = `${num1} + ${num2} =`; // format an addition problem
        break;
      case "subtraction":
        if (num1 < num2) [num1, num2] = [num2, num1]; // ensure no negative results
        newProblem = `${num1} - ${num2} =`; // format the subtraction problem
        break;
      case "multiplication":
        newProblem = `${num1} * ${num2} =`; // format a multiplication problem
        break;
      case "division":
        newProblem = `${num1 * num2} / ${num1} =`; // format division and ensure it is valid
        break;
      default:
        newProblem = "Invalid operation!"; // fallback for invalid operationsa
    }
    setProblem(newProblem); // Update the problem state with the new problem
  };

    // Function to evaluate the answer based on the problem
    const evaluateAnswer = (problem) => {
      const [left, operator, right] = problem.split(' '); // split the problem into components
      const num1 = parseInt(left); // convert the left number to an integer
      const num2 = parseInt(right); // convert the right number to an integer
  
      // switch statement to return the correct answer based on the operation
      switch (operator) {
        case '+':
          return num1 + num2; // Return sum
        case '-':
          return num1 - num2; // Return difference
        case '*':
          return num1 * num2; // Return product
        case '/':
          return num1 / num2; // Return quotient
        default:
          return null; // Fallback if operation is invalid
      }
    };

  // check the user's answer
  const checkAnswer = () => {
    const correctAnswer = evaluateAnswer(problem); // get the correct answer
    if (parseInt(userAnswer) === correctAnswer) { // compare user's answer to correct answer
      setScore(prev => prev + 1); // increment score for correct answer
      setTracking({ // Update tracking with new score
        ...tracking,
        math_score: score + 1
      });
      setUserAnswer(""); // clear the input field
      createMathProblem(); // generate a new problem
    } else {
      setUserAnswer(""); // resets input field to blank, perhaps add something else here later
    }
  };

  return (
    <>
      <main>
        <div id="math-container">
          <h2 id="math-title">Math Facts Practice</h2>
          {/* Setup screen for selecting operation */}
          {!isGameActive && !isFinalView && (
            <div id="math-setup">
              <form id="math-form">
                <div id="selection-operation">
                  <label htmlFor="operation">Operation:</label>
                  {/* Dropdown for selecting math operation */}
                  <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    id="operation"
                    name="operation"
                  >
                    <option value="addition">Addition</option>
                    <option value="subtraction">Subtraction</option>
                    <option value="multiplication">Multiplication</option>
                    <option value="division">Division</option>
                  </select>
                </div>
              </form>
              <div id="directions">
                <ul>
                  <li>1. Select Operation.</li>
                  <li>2. Press <strong>Go.</strong></li>
                  <li>3. How many problems can you solve in 30 seconds?</li>
                </ul>
              </div>
              {/* Button to start the game */}
              <button onClick={startGame} id="go-btn">Go</button>
            </div>
          )}
          {/* Game screen where problems are presented */}
          {isGameActive && (
            <div id="math-facts-game">
              <h3 id="game-mode">{operation.toUpperCase()}</h3>
              <h3 id="math-problem">{problem}</h3>
              {/* Form for user input */}
              <form onSubmit={(e) => { e.preventDefault(); checkAnswer(); }}>
                <input
                  type="text" value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer here"
                  id="answer" autoComplete="off" autoFocus
                />
              </form>
              {/* Display current score and timer */}
              <h3 id="score">SCORE: {score}</h3>
              <h3 id="math-timer">TIME LEFT: {timer}</h3>
              <h3 id="message"></h3>
            </div>
          )}
          {/* Final score view after the game ends */}
          {isFinalView && (
            <div id="final-view">
              <h3 id="selectedGameMode">{operation.toUpperCase()}</h3>
              <h5>Time's up!</h5>
              <h3>Your final score is:</h3>
              <h2 id="final-score">{score}</h2>
              {/* Button to reset the game */}
              <ul className='list-group'>
                {messages.success ? <li className="list-group-item text-success">
                    {messages.message}
                </li> : ''}
                {messages.length > 0 && messages.map((error, index) => (
                    <li className="list-group-item text-danger" key={index}>
                        {error}
                    </li>
                ))}
            </ul>
              <button onClick={() => setIsFinalView(false) & setIsGameActive(false)} id="again-btn">Play Again</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Mathfacts;
