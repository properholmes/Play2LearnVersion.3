import TextInput from './TextInput';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
// declare useNavigate to navigate to user list after adding user
    let navigate = useNavigate();
//creat an empty and stateful user object
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username:'',
        pass_phrase: '', 
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
        
        const apiURL = 'http://localhost:8888/phpreact/frontend/backend/users.php';
        event.preventDefault();

        try{
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            await response.json();
            navigate("/admin")
        } catch (error){
            console.error('Error fetching users:', error);
        }
        
    }

    return (
        <>
            <div className="card" style={{ 'width': '30rem' }}>
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
                                    <TextInput name="confirm_pass_phrase" type="password" placeholder="Confirm Password" />
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