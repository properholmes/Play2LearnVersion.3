import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function UsersList() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const apiURL = 'http://localhost:8888/phpreact/frontend/backend/users.php'; //location of user api logic
      async function fetchUsers() {
        try {
          const response = await fetch(apiURL);
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
          // Handle the error here, e.g., show an error message to the user
        }
      }
      fetchUsers();
    }, []);
  

    return (
  
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6"><b>User Data</b></div>
                    <div className="col-md-6">
                    <Link to="/register" className="btn btn-success btn-sm float-end">New User</Link>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Is Admin?</th>
                            <th>Date Registered</th>
                            <th>Registration Confirmed?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.user_id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{(user.is_admin) ? '✅' : 'no'}</td>
                                <td>{user.date_registered}</td>
                                <td>{(user.registration_confirmed) ? '✅': 'not yet'}</td>
                                <td>
								    <Link to={`/edit/${user.user_id}`} className="btn btn-warning btn-sm">Edit</Link>
							    </td>
                            </tr>
                        ))

                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default UsersList;