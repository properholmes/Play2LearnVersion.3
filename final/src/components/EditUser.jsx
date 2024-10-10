import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
    const { user_id } = useParams();

    // Initialize user state with is_admin based on fetched data
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        pass_phrase: '',
        is_admin: 0, // Assuming the backend returns numerical value for admin
        date_registered: '',
        registration_confirmed: 0
    });
    
    let navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value, checked } = event.target; // Use checked for checkboxes

        setUser({
            ...user,
            [name]: name === 'is_admin' ? checked : value, // Update based on type
        });
    };


    const apiURL = `http://localhost:8888/phpreact/final/backend/users.php?id=${user_id}`;

    const fetchUserData = async () => {
        const response = await fetch(apiURL);
        const data = await response.json();
        setUser(data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            fetch(`http://localhost:8888/phpreact/final/backend/register.php?id=${user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const response = await fetch(apiURL);
            const data = await response.json();
            navigate(`/viewaccount/${user_id}`);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="card" style={{ 'width': '30rem' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col-md-12">Edit User {user_id}</div>
                    <div className="col-md-6">
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">&nbsp;</div>
                    <div className="col-md-4">
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>First Name</label>
                                <input type="text" name="first_name" className="form-control" value={user.first_name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Last Name</label>
                                <input type="text" name="last_name" className="form-control" value={user.last_name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Username</label>
                                <input type="text" name="username" className="form-control" value={user.username} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        name="is_admin"
                                        id="flexSwitchCheckChecked"

                                        checked={user.is_admin}
                                        // Use user.is_admin for state
                                        onChange={handleChange} // Update state on change
                                    />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                        {user.is_admin ? "Admin" : "Not Admin"}
                                    </label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" name="pass_phrase" className="form-control" value={user.pass_phrase} onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label>Confirm</label>
                                <input type="password" name="confirm_pass_phrase" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input type="submit" className="btn btn-primary" value="Save Changes" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditUser;