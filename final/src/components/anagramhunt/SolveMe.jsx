import Message from "./Message";

function SolveMe(props) {
    return (
        <>
            <Message message={props.message} />
            <br/>
            <h2 className="word-hint"> {props.wordHint}</h2>
            <br/>
            <h6> Guess the anagrams of this word: {props.wordLength} letters</h6>
        </>

    )
}

export default SolveMe;
