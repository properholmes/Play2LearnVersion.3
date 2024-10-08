import React, {useState, useEffect} from 'react'

function Header(props) {

  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function fetchUser() {
    
        const response = await fetch('http://localhost:8888/phpreact/frontend/backend/header.php');
        const data = await response.json();
        setUserId(data.userID);
        console.log(data);
      
    }
    fetchUser();
  }, []);
console.log(userId);
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
                <a className="nav-link" href="./about">About Us</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Games
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="./mathfacts" target="blank">Math Facts Practice</a>
                  <a className="dropdown-item" href="./anagramhunt" target="blank">Anagram Hunt</a>
                </div>
              </li>
              <li className="nav-item">
                {!props.session ? <a className="nav-link" href="/login">Login</a> : <a className="nav-link" href={`/viewaccount/${props.session}`}>My Account</a>}
              </li>
            </ul>
      
          </div>
        </nav>
      </header>
    </>
  )

}

export default Header
