import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Score from "./Score";
import Button from "./AnagramBtn";
import Proptypes from 'prop-types';

function reset(props) {
    props.setScore(0);
}



function GameScore(props) {

    const [tracking, setTracking] = useState({
        anagram_user_id: props.sessionId,
        anagram_score: props.score,
        anagram_operation: props.wordLength
    })

    const [errors, setErrors] = useState('');
    const [hasPosted, setHasPosted] = useState(false);

    const [scoreMessage, setScoreMessage] = useState('');
    const correctList = props.correctAnswers;
    const filteredList = props.filteredPossible;
    const correctOptions = correctList.map((word, index) => (
        <li className="list-group-item" style={{ color: 'green', fontWeight: 'bold' }} key={index}>{word}</li>
    ));
    const wrongOptions = filteredList.map((word, index) => (
        <li className="list-group-item" style={{ color: 'red', fontWeight: 'bold' }} key={index}>{word}</li>
    ));

    useEffect(() => {
        if (props.score > 1) {
            setScoreMessage('Great job!');
        } else {
            setScoreMessage('Better luck next time :(');
        }
        if (!hasPosted) {
            async function fetchData() {
                const apiURL = 'http://localhost:8888/phpreact/final/backend/anagram-tracking.php';
                const response = await fetch(apiURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tracking)
                })
                const data = await response.json();
                setErrors(data);
                setHasPosted(true);
            }
            fetchData();
        }

    }, []);

    return (
        <div id="ana-finalview" className="d-grid gap-5">
            <p className="display-3"> {scoreMessage}</p>
            <Score score={props.score} />
            <h5>Your correct answers:</h5>
            <ul className="list-group">
                {correctOptions}
            </ul>
            <h5>You didn't get the following anagrams for <strong>{props.wordHint}</strong></h5>
            <ul className="list-group">
                {wrongOptions}
            </ul>
            <ul className='list-group'>
                {errors.success ? <li className="list-group-item text-success">
                    {errors.message}
                </li> : ''}
                {errors.length > 0 && errors.map((error, index) => (
                    <li className="list-group-item text-danger" key={index}>
                        {error}
                    </li>
                ))}
            </ul>
            <Link to="/play" onClick={reset} className="btn btn-primary">Play Again!</Link>
            <Link to="/anagramhunt" onClick={reset} className="btn btn-primary">Back to Settings</Link>
        </div>

    )
}

GameScore.propTypes = {
    score: Proptypes.number
}

export default GameScore;