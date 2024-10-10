function SelectInput({label, id, values, currentValue, setCurrentValue}) {

    const selectOptions = values.map((value) => 
     <option value={value} key={value.toString()}> {value} </option>
     ); 
     return (
       
         <>
         <label htmlFor={id}>{label}</label>
         <select className="form-select form-select-lg mb-4" 
             aria-label="large select example" id={id}
             defaultValue={currentValue}
             onChange={(e) => setCurrentValue(e.target.value)}>
             {selectOptions}
         </select>
         </>
 
     );
 };
 
 export default SelectInput;