import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import "./header.css";

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    // Retrieve the logged-in user's email from sessionStorage
    const authUser = JSON.parse(sessionStorage.getItem('authUser'));
    const userEmail = authUser ? authUser.email : 'Not logged in';

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('authUser');
        setMenuVisible(false);
        window.location.reload()
    };

    const handleLogin = () => {
      setMenuVisible(false)
      navigate('/login')
    }

    const handleJoinSession = () => {
      navigate('/joinSession', {
        state: {
          error: ''
        }
      })
    }

    return (
      <div className="navbar flex justify-between items-center px-5 py-3 fixed top-0 left-0 w-full z-50">
          <div className="left-content flex items-center gap-6">
              <h1 className="text-2xl font-bold">Movie Swiper</h1>
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a onClick={handleJoinSession} className="nav-link">Start Swiping</a>
          </div>
  
          <div className="icon-container relative">
              <IconButton onClick={toggleMenu}>
                  <PersonIcon className="text-stone-200" />
              </IconButton>
              {menuVisible && (
                  <div className="menu absolute flex flex-col justify-center items-center gap-1 top-12 right-0 bg-white text-black border border-gray-300 rounded-lg shadow-lg p-4 w-48 z-10 text-sm">
                      <p className="font-semibold mb-2">Logged in as:</p>
                      <p className="text-gray-600 break-words mb-6">{userEmail}</p>
                      {userEmail === 'Not logged in' ? (
                          <button
                              onClick={handleLogin}
                              className="logout-button w-fit bg-purple-700 text-white py-1 px-2 rounded-md hover:bg-purple-600 transition mt-2"
                          >
                              Login
                          </button>
                      ) : (
                          <button
                              onClick={handleLogout}
                              className="logout-button w-fit bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition mt-2"
                          >
                              Logout
                          </button>
                      )}
                  </div>
              )}
          </div>
      </div>
  );
  
};

export default Header;
