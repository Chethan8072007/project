import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./RejectedRegistrations.css";

function RejectedRegistrations({ onBack, rejected }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`rejected-registrations-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Rejected Registrations</h1>
      </div>

      {/* Stats Card */}
      <div className="stats-card">
        <div className="stat-item">
          <span className="stat-number">{rejected.length}</span>
          <span className="stat-label">Rejected Registrations</span>
        </div>
      </div>

      {/* Rejected List */}
      <div className="rejected-list">
        {rejected.length === 0 ? (
          <div className="empty-state">
            <p>No rejected registrations</p>
          </div>
        ) : (
          rejected.map((item) => (
            <div key={item.id} className="rejected-item">
              <div className="rejected-avatar">{item.avatar || item.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="rejected-info">
                <h3>{item.name}</h3>
                <p>{item.email}</p>
              </div>
              <span className="status-badge rejected">{item.status || "Rejected"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RejectedRegistrations;
