import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

function ViewAccount(props) {

    let navigate = useNavigate();
    const { user_id } = useParams();

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        pass_phrase: '',
        is_admin: 0,
        date_registered: '',
        registration_confirmed: 0
    });


    const apiURL = `http://localhost:8888/phpreact/frontend/backend/users.php?id=${user_id}`

    const fetchUserData = async () => {

        const response = await fetch(apiURL);
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="card" style={{ 'width': '30rem' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col-md-9"><h5>{user.first_name}'s Account Details</h5></div>
                    <div className="col-md-3">
                        <Link to={`/edit/${user.user_id}`} className="btn btn-warning btn-sm">Edit</Link>
                       
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                   
                    </div>
                    <div className="col-md-12">

                        <div className="mb-3">
                            <p><strong>First Name: </strong> {user.first_name}</p>
                        </div>
                        <div className="mb-3">
                            <p><strong>Last Name: </strong> {user.last_name}</p>
                        </div>
                        <div className="mb-3">
                            <p><strong>Email Address:</strong> {user.email}</p>
                        </div>
                        <div className="mb-3">
                        {user.is_admin ? 
                        <> <Badge variant="light">You are an admin</Badge> <br/> <Link to={`/admin/${user.user_id}`} className="btn btn-warning btn-md mt-3">View all users</Link></>
                        : <Badge variant="warning">You are not an admin</Badge> }
                        </div>


                      
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ViewAccount;