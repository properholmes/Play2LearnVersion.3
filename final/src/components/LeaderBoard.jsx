import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LeaderBoard() {

  let navigate = useNavigate();
  const [mathScores, setDataScores] = useState([]); // Use an array for scores
  const [anagramScores, setAnagramScores] = useState([]); // Use an array for scores

  useEffect(() => {
    const apiURLMath = 'http://localhost:8888/phpreact/final/backend/math-tracking.php'; // Math API location
    const apiURLAnagram = 'http://localhost:8888/phpreact/final/backend/anagram-tracking.php'; // Anagram API location

    async function fetchMath() {
      try {
        const response = await fetch(apiURLMath);
        const data = await response.json();
        setDataScores(data.filter(user => user.score > 0)); // Filter scores with score > 0
      } catch (error) {
        console.error('Error fetching Math data:', error);
      }
    }

    async function fetchAnagrams() {
      try {
        const response = await fetch(apiURLAnagram);
        const data = await response.json();
        setAnagramScores(data.filter(user => user.score > 0)); // Filter scores with score > 0
      } catch (error) {
        console.error('Error fetching Anagram data:', error);
      }
    }

    fetchMath();
    fetchAnagrams();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">
            <b><h4>Leaderboard</h4></b>
          </div>
          <div className="col-md-6" /> {/* Adjusted to avoid unnecessary div */}
        </div>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Math Facts Practice</th>
              <th>Score</th>
              <th>Highest Score (so far)</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {mathScores &&
              mathScores.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>Game {user.score_id}</td>
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
              <th>Anagram Hunt</th>
              <th>Score</th>
              <th>Highest Score (so far)</th>
              <th>Number of Letters</th>
            </tr>
          </thead>
          <tbody>
            {anagramScores &&
              anagramScores.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>Game {user.score_id}</td>
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