import About from './About'

function Header() {
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
                <a className="nav-link" href="/login">Login</a>
              </li>
            </ul>
      
          </div>
        </nav>
      </header>
    </>
  )

}

export default Header


{/* < div classNameName = "nav-container" >
    <nav classNameName="navbar navbar-expand-lg bg-body-tertiary">
      <h1 id="navbar-logo">
        <i classNameName="fa-solid fa-frog"></i>
        <a href="index.html" id="banner" title="Play2Learn Home Page">Play2Learn</a>
      </h1>
      <ul classNameName="nav-menu">
        <li classNameName="nav-links"><a href="/src/public/index.html">Home</a></li>
        <li classNameName="nav-links" id="games">Games</li>
        <ul id="games-links">
          <li classNameName="nav-links p2lgames"><a href="/src/public/games/anagram-hunt.html" target="_blank">Anagram
            Hunt</a></li>
          <li classNameName="nav-links p2lgames"><a href="/src/public/games/math-facts.html" target="_blank">Math Facts
            Practice</a></li>
        </ul>
        <li classNameName="nav-links"><a href="/src/public/about.html">About</a></li>
        <li classNameName="nav-links"><a href="/src/public/login.html">Login</a></li>
      </ul>
    </nav>
      </div > */}