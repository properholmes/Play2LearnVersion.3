import React from 'react';


function TextInput(props) {

  const handleChange = (e) => {
    props.setInputValue(e.target.value); // Update input value using prop 
    props.checkAnswer(e.target.value);  // send value back to parent w/ callback handler
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      // Do something with the input value, e.g., submit it to an API
    }
  };

  return (
    <div>
      <form id="ana-form">
        <div id="your-guess">
          <input
            type="text"
            className="form-control"
            value={props.inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress} 
            placeholder="Type anagram guess here"
          />
          <br />
        </div>
      </form>
    </div>
  );
}

export default TextInput;
