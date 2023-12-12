import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Navbar.css"
export default function Navbar(props) {
  const { logout, token } = props;

  
  return (
    <div className="nav-container">
      <div className="nav-logo">
        <h1>Surf Yurt</h1>
      </div>
      <div className="Links">
        {token && (
          <Link to="/profile" className="nav">
            <span>Profile</span>
          </Link>
        )}
        <Link to="/public" className="nav">
          <span>Public</span>
        </Link>
        {token ? (
          <button onClick={logout} className="nav-logout ">
            Logout
          </button>
        ) : (
          <Link to="/">
            <button className="nav-logout">Login/Signup</button>
          </Link>
        )}
      </div>
    </div>
  );
}
