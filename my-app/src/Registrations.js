import React, { useState, useContext } from "react";
import { DarkModeContext } from "./App";
import "./Registrations.css";

function Registrations({ onBack, newRegistrations, registeredMembers, onApprove, onReject }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("pending");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleApprove = (id) => {
    onApprove(id);
    setPopupMessage("Registration Approved!");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleReject = (id) => {
    onReject(id);
    setPopupMessage("Registration Rejected!");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className={`registrations-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="registrations-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <div className="header-content">
          <h1>Registrations</h1>
          <p>Manage event registrations</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stats-card gradient-purple">
          <div className="stats-icon">⏳</div>
          <div className="stats-value">{newRegistrations.length}</div>
          <div className="stats-label">Pending</div>
        </div>
        <div className="stats-card gradient-blue">
          <div className="stats-icon">✓</div>
          <div className="stats-value">{registeredMembers.length}</div>
          <div className="stats-label">Approved</div>
        </div>
        <div className="stats-card gradient-orange">
          <div className="stats-icon">👥</div>
          <div className="stats-value">{newRegistrations.length + registeredMembers.length}</div>
          <div className="stats-label">Total</div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="section">
        <div className="section-header">
          <h2>Registrations</h2>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending ({newRegistrations.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            Approved ({registeredMembers.length})
          </button>
        </div>

        {/* Registrations List */}
        <div className="registrations-list">
          {activeTab === "pending" && (
            <>
              {newRegistrations.length === 0 ? (
                <div className="empty-state">
                  <p>No pending registrations</p>
                </div>
              ) : (
                newRegistrations.map((reg) => (
                  <div key={reg.id} className="registration-card">
                    <div className="registration-avatar">{reg.avatar}</div>
                    <div className="registration-info">
                      <h3>{reg.name}</h3>
                      <p>{reg.email}</p>
                    </div>
                    <div className="registration-actions">
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(reg.id)}
                      >
                        Reject
                      </button>
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(reg.id)}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === "approved" && (
            <>
              {registeredMembers.length === 0 ? (
                <div className="empty-state">
                  <p>No approved registrations</p>
                </div>
              ) : (
                registeredMembers.map((reg) => (
                  <div key={reg.id} className="registration-card">
                    <div className="registration-avatar approved">{reg.avatar}</div>
                    <div className="registration-info">
                      <h3>{reg.name}</h3>
                      <p>{reg.email}</p>
                    </div>
                    <div className="registration-status">
                      <span className="status-badge approved">Approved</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>

      {/* Success Popup with Backdrop */}
      {showPopup && (
        <>
          <div className="popup-backdrop" onClick={() => setShowPopup(false)} />
          <div className="popup">
            <div className="popup-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <p>{popupMessage}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Registrations;
