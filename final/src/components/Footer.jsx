import { useEffect, useState } from 'react'; // Import hooks from React
import { Link } from 'react-router-dom'; // Import Link for routing

function Footer(props) {
  const session = sessionStorage.getItem('sessionId'); // Retrieve session ID from sessionStorage
  const sessionId = parseInt(session); // Convert session ID to an integer

  const [footerLogout, setFooterLogout] = useState(''); // State to manage logout link

  useEffect(() => {
    // Effect to set the logout link based on session ID
    setFooterLogout(sessionId ? <Link to="/login" onClick={() => sessionStorage.setItem('sessionId', 0)}>Logout</Link> : ''); // Set logout link if sessionId exists
  }, [session]); // Run effect when session changes
  
  return (
    <>
      <div className="container">
        <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p id="copywrite" className="col-md-4 mb-0 text-muted" aria-label="website Copywritten 2024 by Play2Learn">&copy; 2024 Play2Learn</p> {/* Copyright notice */}
          {footerLogout} {/* Render the logout link if applicable */}
          <address className="nav col-md-4 justify-content-end">
            <a href="/contact"> {/* Link to contact page */}
              <i className="fa-regular fa-envelope" id="email-p2l" alt="Email icon"></i></a>
            &nbsp;
            &nbsp;
            <a href="https://www.instagram.com" target="_blank"> {/* Instagram link */}
              <i className="fa-brands fa-instagram" id='insta' alt="Instagram icon"></i></a>
            &nbsp;
            &nbsp;
            <a href="https://twitter.com" target="_blank"> {/* Twitter link */}
              <i className="fa-brands fa-x-twitter" id='x-twitter' alt="X-Twitter icon"></i></a>
            &nbsp;
            &nbsp;
            <a href="https://www.facebook.com" target="_blank"> {/* Facebook link */}
              <i className="fa-brands fa-facebook" id='meta-fb' alt="Meta-Facebook icon"></i></a>
          </address>
        </footer>
      </div>
    </>
  );
}

export default Footer;