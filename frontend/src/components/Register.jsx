import TextInput from './TextInput';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    // declare useNavigate to navigate to user list after adding user
    let navigate = useNavigate();

    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (errors.success === 'done') {
          navigate("/register");
        }
      }, [errors]);

    //create an empty and stateful user object
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        pass_phrase: '',
        confirm_pass_phrase: '',
        is_admin: 0,
        date_registered: '',
        registration_confirmed: 0
    });

  
    // create hnadleChange function to detect typing event on input field
    // match the name of the user object key to the value user types in input field
    const handleChange = (event) => {

        const { name, value } = event.target;

        setUser({
            // spread operator takes user object in-place values and 
            ...user,
            // copy values from input field associated w/ the name of the field into the object values
            [name]: value
        })

    };
    // connect the handleSubmit function to the user.php file in order to facilitate data exchange using an api
    const handleSubmit = async (event) => {

        const apiURL = 'http://localhost:8888/phpreact/frontend/backend/register.php';
        event.preventDefault();


        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();
        setErrors(data);
    }


    return (
        <>
            <div className="card" style={{  }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-3"><b><h5>Register</h5></b></div>
                        <div className="col-lg-9">
                            <Link to="/login" className="btn btn-outline-primary btn-md float-end">Registered already? Login</Link>
                        </div>
                    </div>
                </div>
                <div className="card-body" >
                    <div className="row">
                        <div className="col-lg-2">&nbsp;</div>
                        <div className="col-lg-8">
                            <ul className='list-group'>
                                {errors.success ?<li className="list-group-item text-success">
                                        {errors.message}
                                    </li> : ''   }
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
                                    <div className="mb-3">
                                        <TextInput name="username" type="text" placeholder="Set Username" handleChange={handleChange} />
                                    </div>
                                    <TextInput name="email" type="email" placeholder="Email Address" handleChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <TextInput name="pass_phrase" type="password" placeholder="Password" handleChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <TextInput name="confirm_pass_phrase" type="password" placeholder="Confirm Password" handleChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <input name="register" type="submit" className="btn btn-primary" value="Register" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Register