import React, {useState, useEffect} from 'react'
import TextInput from "./TextInput"
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {

    let navigate = useNavigate();

    const [errors, setErrors] = useState([]);

     //create an empty and stateful user object
     const [user, setUser] = useState({
        username: '',
        pass_phrase: '',
        is_admin: 0,
        registration_confirmed: 0
    });



    // if no errors logging in, nevigate to the homepage
    useEffect(() => {
        if (errors.success === 'done') {
          props.setSession(errors.session)
          navigate("/");
        }
      }, [errors]);

  
    // create hnadleChange function to detect typing event on input field
    // match the name of the user object key to the value user types in input field
    const handleChange = (event) => {

        const { name, value } = event.target;

        setUser({
            // spread operator takes user object in-place values and copies
            ...user,
            // copy values from input field associated w/ the name of the field into the object values
            [name]: value
        })

    };

     // connect the handleSubmit function to the login.php file in order to facilitate data exchange using an api
     const handleSubmit = async (event) => {

        const apiURL = 'http://localhost:8888/phpreact/frontend/backend/login.php';
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
                        <div className="col-md-3"><b><h5>Login</h5></b></div>
                        <div className="col-lg-9">
                            <Link to="/register" className="btn btn-outline-primary btn-md float-end">No account? Register here</Link>
                        </div>
                    </div>
                </div>
                <div className="card-body" >
                    <div className="row">
                        <div className="col-lg-2">&nbsp;</div>
                        <div className="col-lg-8">
                            <ul className='list-group'>
                                {errors.success ? <li className="list-group-item text-success">
                                    {errors.message}
                                </li> : ''}
                                {errors.length > 0 && errors.map((error, index) => (
                                    <li className="list-group-item text-danger" key={index}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                            <form method="POST" onSubmit={handleSubmit} >
                                <div className="mb-3">
                                    <TextInput name="username" type="text" placeholder="Username" handleChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <TextInput name="pass_phrase" type="password" placeholder="Password" handleChange={handleChange} />
                                </div>

                                <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" name="rememberme" id="rememberme" />
                                <label className="form-check-label" htmlFor="rememberme">
                                    Remember Me
                                </label>
                                </div>

                                <div className="mb-3">
                                    <input name="login" type="submit" className="btn btn-primary" value="Login" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login