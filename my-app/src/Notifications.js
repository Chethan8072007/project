import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./Notifications.css";

function Notifications({ onBack, onNavigateToNewRegistration, onNavigateToRegisteredMembers, onNavigateToRejectedRegistrations }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`notifications-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        <div className="notification-item" onClick={onNavigateToNewRegistration}>
          <span className="notification-icon">👥</span>
          <div className="notification-info">
            <p className="notification-title">New Registration</p>
          </div>
          <span className="notification-arrow">→</span>
        </div>

        <div className="notification-item" onClick={onNavigateToRegisteredMembers}>
          <span className="notification-icon">📋</span>
          <div className="notification-info">
            <p className="notification-title">Registered Members</p>
          </div>
          <span className="notification-arrow">→</span>
        </div>

        <div className="notification-item" onClick={onNavigateToRejectedRegistrations}>
          <span className="notification-icon reject">❌</span>
          <div className="notification-info">
            <p className="notification-title">Registration Rejected</p>
          </div>
          <span className="notification-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
