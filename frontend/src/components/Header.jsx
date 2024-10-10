import React, {useState, useEffect} from 'react'

function Header(props) {

  useEffect(() => {
    async function fetchUser() {
    
        const response = await fetch('http://localhost:8888/phpreact/frontend/backend/header.php');
        const data = await response.json();
      
    }
    fetchUser();
  }, []);

 const sessionId = parseInt(props.sessionId);
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <a className="navbar-brand ms-3" href="./">Play2Learn</a>
          <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">   

            <ul className="navbar-nav mr-auto ms-3">
              <li className="nav-item active">
                <a className="nav-link" href="./">Home<span className="sr-only">(current)</span></a>
              </li>
            
              <li className="nav-item">
                <a className="nav-link" href="../leaderboard">Leaderboard</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  About Us
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="nav-link" href="../about">About Play2Learn</a>
                  <a className="nav-link" href="../contact">Contact Us</a>
                  <a className="nav-link" href="../reviews">Reviews</a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Games
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="../mathfacts">Math Facts Practice</a>
                  <a className="dropdown-item" href="../anagramhunt" >Anagram Hunt</a>
                </div>
              </li>
              <li className="nav-item">
                {!sessionId ? <a className="nav-link" href="/login">Login</a> : <a className="nav-link" href={`/viewaccount/${sessionId}`}>My Account</a>}
              </li>
            </ul>
      
          </div>
        </nav>
      </header>
    </>
  )

}

export default Header
