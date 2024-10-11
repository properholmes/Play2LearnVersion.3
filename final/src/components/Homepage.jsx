import Quotes from "./Quotes";
import Card from "./Card";

function Homepage(props) { 
    // define data & logic for the Math Facts Practice & Anagram cards
    // button recieves data pointing to corresponding game
    const math = {
        title: "Math Facts Practice",
        type: "math",
        description: "Fun and effective Math Practice, for all ages! A super fun way to sharpen your math skills and become a whiz with numbers! Ready for a challenge?",
        src: "/mathfacts",
        image: "../src/assets/images/numbers.jpg"
    }; 
    
    const anagram = {
        title: "Anagram Hunt",
        type: "anagram",
        description: "Calling all word wizards! Dive into Anagram Hunt, a game challenging you to find all the hidden words formed by rearranging the letters of a given word.",
        src: "/anagramhunt",
        image: "../src/assets/images/letters.jpg"
    };

    return (
        <div className="container"> {/* main container for the homepage */}
          <div className="row justify-content-center"> {/* row for quotes */}
            <div className="col-auto"> 
              <Quotes className='quotes' /> {/* Render the Quotes component */}
            </div>
          </div>
          <div className="row justify-content-center"> {/* row for game cards */}
            <div className="col-lg"> 
              <Card data={math} /> {/* render Math Facts card (w/ data) */}
            </div>
            <div className="col-lg"> 
              <Card data={anagram} /> {/* render Anagram Hunt (w/ data)*/}
            </div>
          </div>
        </div>
    );
}

export default Homepage;