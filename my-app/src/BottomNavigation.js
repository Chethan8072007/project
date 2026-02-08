import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./BottomNavigation.css";

function BottomNavigation({ currentPage, onNavigate, onProfileClick }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`bottom-nav ${isDarkMode ? 'dark-mode' : ''}`}>
      <button 
        className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
        onClick={() => onNavigate('dashboard')}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span>Home</span>
      </button>
      
      <button 
        className={`nav-item ${currentPage === 'myEvents' ? 'active' : ''}`}
        onClick={() => onNavigate('myEvents')}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
        </svg>
        <span>Events</span>
      </button>
      
      <button 
        className={`nav-item ${currentPage === 'createEvent' ? 'active' : ''}`}
        onClick={() => onNavigate('createEvent')}
      >
        <div className="nav-icon-wrapper">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>
        <span>Create</span>
      </button>
      
      <button 
        className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
        onClick={onProfileClick}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span>Profile</span>
      </button>
    </div>
  );
}

export default BottomNavigation;
