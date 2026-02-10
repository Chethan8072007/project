import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./BottomNavigation.css";

function BottomNavigation({ currentPage, onNavigate, onProfileClick, isMenuOpen, onToggleMenu, onLogout }) {
  const { isDarkMode } = useContext(DarkModeContext);

  const closeMenu = () => {
    onToggleMenu(false);
  };

  const handleNavigate = (pageId) => {
    onNavigate(pageId);
    closeMenu();
  };

  const handleProfileClick = () => {
    onProfileClick();
    closeMenu();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    closeMenu();
  };

  return (
    <>
      {/* Backdrop */}
      {isMenuOpen && (
        <div className={`menu-backdrop ${isDarkMode ? 'dark-mode' : ''}`} onClick={closeMenu}></div>
      )}

      {/* Slide-out menu */}
      <div className={`slide-menu ${isMenuOpen ? 'open' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="menu-header">
          <h2>Menu</h2>
        </div>
        <nav className="menu-items">
          <button 
            className={`menu-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigate('dashboard')}
          >
            <svg className="menu-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>Home</span>
          </button>
          
          <button 
            className={`menu-item ${currentPage === 'myEvents' ? 'active' : ''}`}
            onClick={() => handleNavigate('myEvents')}
          >
            <svg className="menu-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
            </svg>
            <span>Events</span>
          </button>
          
          <button 
            className={`menu-item ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={handleProfileClick}
          >
            <svg className="menu-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Profile</span>
          </button>

          <button 
            className="menu-item logout"
            onClick={handleLogout}
          >
            <svg className="menu-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
}

export default BottomNavigation;
