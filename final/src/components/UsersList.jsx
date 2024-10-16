import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



function UsersList() {
    // initialize navigation for redirection and create a state to hold user data
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    // fetch users from the API when the component mounts
    useEffect(() => {
      const apiURL = 'http://localhost:8888/phpreact/final/backend/users.php'; //location of user api logic
      async function fetchUsers() {
        try {
          const response = await fetch(apiURL);
          const data = await response.json();
          setUsers(data); // updates state w/ fetched user data
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
      fetchUsers();
    }, []);
    
    // handle user deletion
    const handleDelete = (user_id) => {
		if(confirm("Are your sure you want to remove it?"))
		{
			fetch(`http://localhost:8888/phpreact/final/backend/users.php?id=${user_id}`, {
				method : 'DELETE'
			})
			.then((response) => response.json())
			.then((data) => {
				setUsers((prevUser) => prevUser.filter((user) => user.id !== user_id));
                //refresh the page
                navigate(location => ({ ...location, key: Math.random() }));
			});
		}
	};
  

    return (
  
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-2"><b><h4>All User Data</h4></b></div>
                    <div className="col-md-10">
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
								    <Link to={`/edit/${user.user_id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                    <button type="button" onClick={() => handleDelete(user.user_id)} className="btn btn-danger btn-sm">Delete</button>
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