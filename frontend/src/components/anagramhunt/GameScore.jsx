import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Score from "./Score";
import Button from "./AnagramBtn";
import Proptypes from 'prop-types';

function reset(props) {
    props.setScore(0);
}


function GameScore(props) {

    const [scoreMessage, setScoreMessage] = useState('');
    const correctList = props.correctAnswers;
    const correctOptions = correctList.map((word, index) => (
        <li className="list-group-item" style={{ color: 'green', fontWeight: 'bold' }} key={index}>{word}</li>
    ));

    useEffect(() => {
        if (props.score > 2) {
            setScoreMessage('Great job!');
        } else {
            setScoreMessage('Better luck next time :(');
        }
    }, [props.score]);

    return (
        <div id="ana-finalview" className="d-grid gap-5">
            <p className="display-3"> {scoreMessage}</p>
            <Score score={props.score} />
            <h5>Your correct answers:</h5>
            <ul className="list-group">
                {correctOptions}
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