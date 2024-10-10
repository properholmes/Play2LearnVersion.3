import TextInput from './TextInput';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Contact() {
    // declare useNavigate to navigate 
    let navigate = useNavigate();

    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (errors.success === 'done') {
            setErrors([]);
            navigate("/contact");
        }
    }, [errors]);

    //create an empty and stateful object
    const [contact, setContact] = useState({
        first_name: '',
        last_name: '',
        email: '',
        message: ''
    });


    // create hnadleChange function to detect typing event on input field
    // match the name of the object key to the value types in input field
    const handleChange = (event) => {

        const { name, value } = event.target;

        setContact({
            // spread operator takes object in-place values and 
            ...contact,
            // copy values from input field associated w/ the name of the field into the object values
            [name]: value
        })

    };
    // connect the handleSubmit function to the php file in order to facilitate data exchange using an api
    const handleSubmit = async (event) => {

        const apiURL = 'http://localhost:8888/phpreact/final/backend/contact.php';
        event.preventDefault();


        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
        const data = await response.json();
        setErrors(data);
    }


    return (
        <>
            <div className="card" style={{ 'width': '30rem' }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col-lg-12"><b>Contact Us at Play2Learn</b></div>
                        <div className="col-lg-6">
                        
                        </div>
                    </div>
                </div>
                <div className="card-body" >
                    <div className="row">
                        <div className="col-lg-2">&nbsp;</div>
                        <div className="col-lg-8">
                            <ul className='list-group'>
                                {errors.length > 0 && errors.map((error, index) => (
                                    <li className="list-group-item text-danger" key={index}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                            <form method="POST" onSubmit={handleSubmit} >
                                <div className="mb-3">
                                    <TextInput name="first_name" type="text" placeholder="First Name" handleChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <TextInput name="last_name" type="text" placeholder="Last Name" handleChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <TextInput name="email" type="email" placeholder="Email Address" handleChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Your Message:</label>
                                    <br/>
                                    <textarea id="message" name='message' className="form-control" rows="4" cols="30" onChange={handleChange}>
                    
                                    </textarea>
                                </div>

                                <div className="mb-3">
                                    <input name="contact" type="submit" className="btn btn-primary" value="Send Message" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Contact