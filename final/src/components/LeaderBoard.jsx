import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LeaderBoard() {
  let navigate = useNavigate(); // initialize useNavigate for navigation
  // create state for math & anagram scores
  const [mathScores, setDataScores] = useState([]);
  const [anagramScores, setAnagramScores] = useState([]);

  useEffect(() => {
    const apiURLMath = 'http://localhost:8888/phpreact/final/backend/math-tracking.php'; // math API location
    const apiURLAnagram = 'http://localhost:8888/phpreact/final/backend/anagram-tracking.php'; // anagram API location

    // async fetch math & anagram scores functions
    async function fetchMath() {
      try {
        const response = await fetch(apiURLMath); // fetch math scores
        const data = await response.json();
        setDataScores(data.filter(user => user.score > 0)
                          .sort((a, b) => (b.max_number || 0) - (a.max_number || 0))
                      ); // set scores where score > 0
      } catch (error) {
        console.error('Error fetching Math data:', error); // handle fetch error
      }
    }

    async function fetchAnagrams() {
      try {
        const response = await fetch(apiURLAnagram);
        const data = await response.json();
        setAnagramScores(data.filter(user => user.score > 0)
                             .sort((a, b) => (b.max_number || 0) - (a.max_number || 0))
                        );
      } catch (error) {
        console.error('Error fetching Anagram data:', error);
      }
    }

    fetchMath(); // call functions for scores
    fetchAnagrams();
  }, []); // empty dependency array to run once on mount

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">
            <b><h4>Leaderboard</h4></b>
          </div>
          <div className="col-md-6" /> {/* Adjusted from P2Lv.2 to avoid unnecessary div */}
        </div>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Math Game</th>
              <th>Score</th>
              <th>Highest Score (so far)</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {/* Map the scores to the table */}
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
              <th>Anagram Game</th>
              <th>Score</th>
              <th>Highest Score (so far)</th>
              <th>Number of Letters</th>
            </tr>
          </thead>
          <tbody>
            {/* Map the scores to the table */}
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