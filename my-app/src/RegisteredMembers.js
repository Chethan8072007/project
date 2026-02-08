import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./RegisteredMembers.css";

function RegisteredMembers({ onBack }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const members = [
    { id: 1, name: "John Smith", email: "john@example.com", status: "Approved" },
    { id: 2, name: "Emma Wilson", email: "emma@example.com", status: "Approved" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", status: "Approved" },
  ];

  return (
    <div className={`registered-members-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Registered Members</h1>
      </div>

      {/* Members Count */}
      <div className="members-count">
        <p>{members.length} Members</p>
      </div>

      {/* Members List */}
      <div className="members-list">
        {members.map((member) => (
          <div key={member.id} className="member-item">
            <div className="member-avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p>{member.email}</p>
            </div>
            <div className="member-status">
              <span className="status-badge approved">{member.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegisteredMembers;
