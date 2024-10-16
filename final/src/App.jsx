import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import About from './components/About.jsx';
import anagrams from "./components/anagramhunt/anagramsArray.js";
import Contact from "./components/Contact.jsx";
import EditUser from "./components/EditUser.jsx";
import Footer from "./components/Footer.jsx";
import GamePlay from './components/anagramhunt/GamePlay.jsx';
import GameScore from './components/anagramhunt/GameScore.jsx';
import GameSetup from './components/anagramhunt/GameSetup.jsx';
import Header from "./components/Header.jsx";
import Homepage from './components/Homepage.jsx';
import Leaderboard from './components/LeaderBoard.jsx';
import Login from './components/Login.jsx';
import Mathfacts from './components/Mathfacts.jsx'
import Register from './components/Register.jsx';
import Reset from './components/Reset.jsx';
import Reviews from './components/Reviews.jsx'
import UsersList from './components/UsersList.jsx';
import ViewAccount from './components/ViewAccount.jsx';
import './anaApp.css'


function App() { 

  // find a random index in an array
  function findRandom(array) {
    if (array) {
      const random = Math.floor(Math.random() * array.length)
      const randomSelected = array[random];
      return randomSelected;
    }
      return 0;
  }

  function Redirect() {
    const navigate = useNavigate();
  
    useEffect(() => {
      navigate('/');
    }, []);
  
    return null; // Render nothing
  }
  

  // set the initial wordlength to 5 
  const [wordLength, setWordLength] = useState('5');
  // set the first block of anagram words to a random block of 5 characters
  const [wordAnswers, setWordAnswer] = findRandom(anagrams[wordLength]);
  // set the initial score to 0 - need the score to persist in GamePlay and GameScore - so set in parent to avoid change
  const [score, setScore] = useState(0);
  // get length of anagram block and subtract 1 because we will show the user one of the words as a hint
  const [wordsLeft, setWordsLeft] = useState(wordAnswers.length - 1);

  // Logic for displaying correct answers in the final score view of anagram game
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const[blockCorrect, setBlockCorrect]= useState([]);

   // all the word possibilies based on the character length the user selected in the first view
   const [allWords, setAllWords] = useState(anagrams[wordLength]);
   // list of possible answers in anagram block
   const[possibleWords, setPossibleWords] = useState(findRandom(allWords));
   // find the starting word in that anagram block
   const [wordHint, setWordHint] = useState(findRandom(possibleWords));


   // filter word array to remove the word hint or keyword
   const [filteredPossible, setFilteredPossible] = useState(() => {
       if (possibleWords && wordHint) {
           return possibleWords.filter((item) => item !== wordHint);
       } else {
           return []; // Return an empty array if either possibleWords or wordHint is undefined
       }
   });

  const [sessionId, setSessionId] = useState(sessionStorage.getItem('sessionId'));



  return (
    <>
    <Header sessionId={sessionId}/>
    <Routes>
    <Route exact path="/" element={<Homepage />} />
    <Route exact path="/about" element={<About />} />
    <Route exact path="/anagramhunt" element={
          <GameSetup
          wordLength={wordLength}
          setWordLength={setWordLength} />
          }>
        </Route>
        <Route exact path="/play" element={
          <GamePlay 
          score={score}
          setScore={setScore}
          wordAnswers={wordAnswers}
          wordLength={wordLength}
          wordsLeft={wordsLeft}
          findRandom={findRandom}
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}
          blockCorrect={blockCorrect}
          setBlockCorrect={setBlockCorrect} 
          filteredPossible={filteredPossible}
          setFilteredPossible={setFilteredPossible}
          allWords={allWords}
          setAllWords={setAllWords}
          possibleWords={possibleWords}
          setPossibleWords={setPossibleWords}
          wordHint={wordHint}
          setWordHint={setWordHint}
          />
        }>
        </Route>
        <Route exact path="/score" element={
          <GameScore 
          score={score}
          wordLength={wordLength}
          correctAnswers={correctAnswers}
          blockCorrect={blockCorrect}
          sessionId={sessionId} 
          filteredPossible={filteredPossible}
          wordHint={wordHint}/>
        }>          
        </Route>
        <Route exact path="/mathfacts" element={<Mathfacts sessionId={sessionId} />} />
        
        <Route exact path="/login" element={<Login setSessionId={setSessionId}/>} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin/:user_id" element={<UsersList />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="/edit/:user_id" element={<EditUser sessionId={sessionId} />} />
        <Route path="/reset/:user_id" element={<Reset sessionId={sessionId} />} />
        <Route path="/viewaccount/:user_id" element={<ViewAccount sessionId={sessionId} />} />
        <Route path="/reviews" element={<Reviews sessionId={sessionId} />} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="*" element={<Redirect to="/" replace />} />
    </Routes>
    <Footer sessionId={sessionId} setSessionId={setSessionId} />
    </>
  )
  
}

export default App
