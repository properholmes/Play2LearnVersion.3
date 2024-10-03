// Create the login form: email / pwd
// Create register form.. email / pwd / repeat pwd
// When user clicks on 'Need An Account? Register link, 
// use javascript to hide the login form and show the register form
// Both forms should have an action of javascript:alert('Form Submitted'), alerting that
// the form was submitted
//Hide login form when creating new account, use Javascript to hide the login form and show the register form
import TextInput from './TextInput';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

    const [user, setUser] = useState({
        first_name : '',
        last_name : '',
        email : '', 
        password: ''

    });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setUser({
            ...user,
            [name] :value
        })

    };

    const handleSubmit = (event) => {
        ;
    }

    return (
        <>
            <div className="card" style={{'width': '30rem'}}>
                <div className="card-header">
                    <div className="row">
                        <div className="col-lg-6"><b>Register</b></div>
                        <div className="col-lg-6">
                            <Link to="/admin" className="btn btn-success btn-sm float-end">View All</Link>
                        </div>
                    </div>
                </div>
                <div className="card-body" >
                    <div className="row">
                        <div className="col-lg-2">&nbsp;</div>
                        <div className="col-lg-8">
                            <form method="POST" >
                                <div className="mb-3">
                                    <TextInput name="first_name" type="text" placeholder="First Name" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <TextInput name="last_name" type="text" placeholder="Last Name" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <TextInput name="email" type="email" placeholder="Email Address" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <TextInput name="password" type="password" placeholder="Password" onChange={handleChange}/>
                                </div>
                                <div className="mb-3">
                                    <TextInput name="confirmpassword" type="password" placeholder="Confirm Password" />
                                </div>
                                <div className="mb-3">
                                    <input type="submit" className="btn btn-primary" value="Register" />
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