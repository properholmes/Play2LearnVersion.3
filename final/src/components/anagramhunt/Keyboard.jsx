import {useEffect} from 'react';

function Keyboard({setUserAnswer}) {
  
  useEffect(() => {
    const handleKeyUp = (e) => {
      e.preventDefault(); // prevent the normal behavior of the key
      if (e.key === ' ' || e.key === 'Enter') { // space/Enter
        setUserAnswer('');
      } else if (e.key === 'Backspace') {
        setUserAnswer(prevUserAnswer =>
          prevUserAnswer.substring(0, prevUserAnswer.length - 1));
      } else if (!isNaN(e.key)) {
        // Number() will remove leading zeroes
        setUserAnswer(prevUserAnswer =>
          String(Number(prevUserAnswer + e.key)));
      }
    }
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp); //cleanup
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No dependencies. Will only run on mounting

  return null; // This component doesn't output anything
}
export default Keyboard;