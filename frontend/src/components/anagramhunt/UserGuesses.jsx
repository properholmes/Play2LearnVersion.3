function UserGuesses(props) {
    const wordList = props.possibleWords;
    
    const listOptions = wordList.map((word, index)=> (
        <li className= "list-group-item" key={index}>{word}</li>
    ));
    const correctList= props.correctAnswers;
    const correctOptions = correctList.map((word, index) => (
        <li className= "list-group-item" style={{color:'green', fontWeight:'bold'}} key={index}>{word}</li>
    ));

    return (
        <>
        <h3>Pssst: Here are the actual answers</h3>
        <ul className="list-group">
            {listOptions}
        </ul>
        <br/>
        <h5>Your correct answers:</h5>
        <ul className="list-group">
            {correctOptions}
        </ul>
           
        </>
    )
}

export default UserGuesses;