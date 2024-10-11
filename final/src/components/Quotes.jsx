import {useState, useEffect} from 'react';

function Quotes() {
    
//random quote generator: 
//first create an array of quotes (strings)
const quotes = [
    '"Thanks to Anagram Hunt, I finally aced that Scrabble tournament against my grandma! Now she owes me those cookies." -TurboTypist_98 (age 10 & 3/4)',
    '"Math used to be a mystery, but Math Facts Practice turned it into a cakewalk! Now I can calculate pizza slices like a superhero." -CaptainCalculator (age 8)',
    '"Since using Play2Learn, my vocabulary has become so fancy, even my cat looks at me differently. Maybe it\'s time to invest in a monocle..." -MadameLexicon (age 12)',
    '"Play2Learn is the best! It\'s like having a personal cheerleader for my brain... except way cooler." -BrainiacBolt (age 7)',
    '"Shhh! Don\'t tell my parents, but Play2Learn\'s games are secretly way more fun than video games. Don\'t judge me!" -SneakyLearner_xX (age 11)'
  ];
  
  //generate a random integer between a low and high value
  function randInt(low, high) {
    //declare a constant variable rndDec and assign it Math.random() function
    const rndDec = Math.random();
    //calculate random integer within the specified range. Multiply the random decimal by the difference between the high and low values, 
    //add 1 to account for the inclusive low value round down the result using Math.floor(), and add the low value again to get the final random integer within the range
    const rndInt = Math.floor(rndDec * (high - low + 1) + low);
    //return the random integer
    return rndInt;
  }
  
  //retrieve a random quote from the 'quotes' array
  function getRandomQuote() {
    //generate a random index within the range of the quotes
    const randomIndex = randInt(0, quotes.length - 1);
    //return the quote at the random index
    return quotes[randomIndex];
  }

  
  const[quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuote(getRandomQuote());
    }, 10000);
    // unmount quotes component as necessary for switching between components/routes
    return () => clearInterval(intervalId);
  },[]);
  

    return (
        
        <aside id="testimonials">
            <h2>Happy Clients Say...</h2>
            <span>
                <p id="quote">{quote}</p>
            </span>
        </aside>
        )
    
}

export default Quotes 