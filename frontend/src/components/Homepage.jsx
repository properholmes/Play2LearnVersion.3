import Quotes from "./Quotes"
import Card from "./Card"

function Homepage(props) { 

    const math = {
        title: "Math Facts Practice",
        type: "math",
        description: "Fun and effective Math Practice, for all ages! A super fun way to sharpen your math skills and become a whiz with numbers! Ready for the challenge?",
        src: "/mathfacts",
        image: "../src/assets/images/numbers.jpg"
      } 
    
      const anagram = {
        title: "Anagram Hunt",
        type: "anagram",
        description: "Calling all word wizards! Dive into Anagram Hunt, a game that challenges you to find all the hidden words formed by rearranging the letters of a given word.",
        src: "/anagramhunt",
        image: "../src/assets/images/letters.jpg"
      }
    
    return (

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
            <Quotes className='quotes' />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg">
            <Card data={math} />
            </div>
            <div className="col-lg">
            <Card data={anagram} />
            </div>
          </div>
        </div>
    )
}

export default Homepage