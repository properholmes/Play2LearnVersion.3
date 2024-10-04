import React from 'react';
//pass in an empty f to handlechange in event user doesn't supply an onChange f
function TextInput({name, type, placeholder, handleChange = () => {}}) {

  return (
    <div>
      <label htmlFor={name} className="form-label">{placeholder}</label>
      <input type={type} className="form-control" id={name} name={name} onChange={handleChange}/>
    </div>
  );
}

export default TextInput;