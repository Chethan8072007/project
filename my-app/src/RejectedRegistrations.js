import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./RejectedRegistrations.css";

function RejectedRegistrations({ onBack }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const rejected = [
    { id: 1, name: "David Lee", email: "david@example.com", status: "Rejected" },
  ];

  return (
    <div className={`rejected-registrations-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Rejected Registrations</h1>
      </div>

      {/* Rejected Count */}
      <div className="rejected-count">
        <p>{rejected.length} Rejected</p>
      </div>

      {/* Rejected List */}
      <div className="rejected-list">
        {rejected.map((item) => (
          <div key={item.id} className="rejected-item">
            <div className="rejected-avatar">{item.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="rejected-info">
              <h3>{item.name}</h3>
              <p>{item.email}</p>
            </div>
            <div className="rejected-status">
              <span className="status-badge rejected">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RejectedRegistrations;
