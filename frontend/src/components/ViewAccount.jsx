import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ViewAccount() {

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
                    <div className="col-md-4">&nbsp;</div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <h6>First Name: `{user.first_name}`</h6>
                        </div>
                        <div className="mb-3">
                            <h6>Last Name: '{user.last_name}'</h6>
                        </div>
                        <div className="mb-3">
                            <h6>Email Address '{user.email}'</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ViewAccount;