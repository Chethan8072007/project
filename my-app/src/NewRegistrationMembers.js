import React, { useState, useContext } from "react";
import { DarkModeContext } from "./App";
import "./NewRegistrationMembers.css";

function NewRegistrationMembers({ onBack }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const [registrations] = useState([
    { id: 1, name: "John Smith", event: "Tech Conference 2024", date: "10:30 AM", avatar: "JS" },
    { id: 2, name: "Emma Wilson", event: "Music Festival", date: "09:15 AM", avatar: "EW" },
    { id: 3, name: "Michael Brown", event: "Art Exhibition", date: "Yesterday", avatar: "MB" },
  ]);

  return (
    <div className={`new-registration-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>New Registration</h1>
      </div>

      {/* Registrations List */}
      <div className="registrations-list">
        {registrations.map((reg) => (
          <div key={reg.id} className="registration-card">
            <div className="registration-avatar">{reg.avatar}</div>
            <div className="registration-info">
              <h3>{reg.name}</h3>
              <p className="event-name">{reg.event}</p>
              <p className="date-label">New Registration • {reg.date}</p>
            </div>
            <button className="btn-check">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewRegistrationMembers;
