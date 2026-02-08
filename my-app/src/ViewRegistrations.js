import React, { useState } from "react";
import "./ViewRegistrations.css";

function ViewRegistrations({ onBack, eventId, events }) {
  // Find the event based on eventId
  const event = events.find((e) => e.id === eventId);
  const eventName = event ? event.title : "Event";

  const [registrations] = useState([
    { id: 1, name: "John Doe", email: "johndoe123@gmail.com", phone: "+91 98765 43210", avatar: "JD", date: "Feb 10, 2025" },
    { id: 2, name: "Jane Smith", email: "janesmith123@gmail.com", phone: "+91 98765 43211", avatar: "JS", date: "Feb 11, 2025" },
    { id: 3, name: "Michael Brown", email: "michaelbrown@gmail.com", phone: "+91 98765 43212", avatar: "MB", date: "Feb 12, 2025" },
    { id: 4, name: "Sarah Davis", email: "sarahdavis@gmail.com", phone: "+91 98765 43213", avatar: "SD", date: "Feb 13, 2025" },
  ]);

  return (
    <div className="view-registrations-page">
      {/* Header */}
      <div className="view-registrations-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>{eventName}</h1>
      </div>

      {/* Stats Card */}
      <div className="stats-card">
        <div className="stat-item">
          <span className="stat-number">{registrations.length}</span>
          <span className="stat-label">Total Registrations</span>
        </div>
      </div>

      {/* Registrations List */}
      <div className="registrations-list">
        {registrations.map((reg) => (
          <div key={reg.id} className="registration-card">
            <div className="registration-avatar">{reg.avatar}</div>
            <div className="registration-info">
              <h3>{reg.name}</h3>
              <p className="reg-email">{reg.email}</p>
              <p className="reg-phone">{reg.phone}</p>
              <p className="reg-date">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
                Registered on {reg.date}
              </p>
            </div>
            <button className="view-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewRegistrations;
