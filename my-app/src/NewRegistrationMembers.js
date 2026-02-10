import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./NewRegistrationMembers.css";

function NewRegistrationMembers({ onBack, registrations, onApprove }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`new-registration-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>New Registration</h1>
      </div>

      {/* Stats Card */}
      <div className="stats-card">
        <div className="stat-item">
          <span className="stat-number">{registrations.length}</span>
          <span className="stat-label">New Registrations</span>
        </div>
      </div>

      {/* Registrations List */}
      <div className="registrations-list">
        {registrations.length === 0 ? (
          <div className="empty-state">
            <p>No new registrations</p>
          </div>
        ) : (
          registrations.map((reg) => (
            <div key={reg.id} className="registration-card">
              <div className="registration-avatar">{reg.avatar}</div>
              <div className="registration-info">
                <h3>{reg.name}</h3>
                <p className="event-name">{reg.event || reg.email}</p>
                <p className="date-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                  {reg.date}
                </p>
              </div>
              <button 
                className="btn-check"
                onClick={() => onApprove(reg.id)}
                title="Approve"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewRegistrationMembers;
