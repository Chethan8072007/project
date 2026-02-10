import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./RegisteredMembers.css";

function RegisteredMembers({ onBack, members }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`registered-members-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Registered Members</h1>
      </div>

      {/* Stats Card */}
      <div className="stats-card">
        <div className="stat-item">
          <span className="stat-number">{members.length}</span>
          <span className="stat-label">Registered Members</span>
        </div>
      </div>

      {/* Members List */}
      <div className="members-list">
        {members.length === 0 ? (
          <div className="empty-state">
            <p>No registered members</p>
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="member-item">
              <div className="member-avatar">{member.avatar || member.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.email}</p>
              </div>
              <span className="status-badge approved">{member.status || "Approved"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RegisteredMembers;
