import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LeaderBoard() {

    let navigate = useNavigate();
    const [dataScores, setDataScores] = useState('');

    useEffect(() => {
        const apiURL = 'http://localhost:8888/phpreact/frontend/backend/math-tracking.php'; //location of user api logic
        async function fetchUsers() {
            try {
                const response = await fetch(apiURL);
                const data = await response.json();
                setDataScores(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchUsers();
    }, []);

    console.log(dataScores);

    return (

        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6"><b><h4>Leaderboard</h4></b></div>
                    <div className="col-md-10">

                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Math Game</th>
                            <th>Score</th>
                            <th>Best Score in Math Facts</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataScores && dataScores.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.score_id} attempts</td>
                                <td>{user.score}</td>
                                <td>{user.max_number ? user.max_number : 'N/A'}</td>
                                <td>{user.operation}</td>  
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Anagram Game</th>
                            <th>Score</th>
                            <th>Best Score in Anagram Hunt Game </th>
                            <th>Number of Letters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataScores && dataScores.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.score_id} attempts</td>
                                <td>{user.score}</td>
                                <td>{user.max_number ? user.max_number : 'N/A'}</td>
                                <td>{user.operation}</td>  
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>

    );
}

export default LeaderBoard;