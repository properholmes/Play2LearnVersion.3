import TextInput from './TextInput';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyAccount() {
    // state holding user information
    const [user, setUser] = useState({
        first_name: '', 
        last_name: '', 
        email: '', 
        password: '' 
    });

    // handle input field changes
    const handleChange = (event) => {
        const { name, value } = event.target; // destructure name and value from the event

        setUser({
            // spread operator to maintain existing user values
            ...user,
            // update the specific field based on input name
            [name]: value
        });
    };

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
                                    <TextInput name="confirmpassword" type="password" placeholder="New Password" />
                                </div>
                                <div className="mb-3">
                                    <TextInput name="confirmpassword" type="password" placeholder="Confirm New Password" />
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

export default MyAccount