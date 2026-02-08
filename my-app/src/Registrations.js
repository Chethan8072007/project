import React, { useState, useContext } from "react";
import { DarkModeContext } from "./App";
import "./Registrations.css";

function Registrations({ onBack }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingRegistrations, setPendingRegistrations] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", avatar: "JS" },
    { id: 2, name: "Emma Wilson", email: "emma@example.com", avatar: "EW" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", avatar: "MB" },
  ]);
  const [approvedRegistrations, setApprovedRegistrations] = useState([
    { id: 4, name: "Sarah Davis", email: "sarah@example.com", avatar: "SD" },
    { id: 5, name: "James Wilson", email: "james@example.com", avatar: "JW" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleApprove = (id) => {
    const reg = pendingRegistrations.find(r => r.id === id);
    if (reg) {
      setPendingRegistrations(pendingRegistrations.filter(r => r.id !== id));
      setApprovedRegistrations([...approvedRegistrations, { ...reg, status: "Approved" }]);
      setPopupMessage("Registration Approved!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        if (pendingRegistrations.length - 1 === 0) {
          setActiveTab("approved");
        }
      }, 2000);
    }
  };

  const handleReject = (id) => {
    setPendingRegistrations(pendingRegistrations.filter(r => r.id !== id));
    setPopupMessage("Registration Rejected!");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      if (pendingRegistrations.length - 1 === 0) {
        setActiveTab("approved");
      }
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
          <div className="stats-value">{pendingRegistrations.length}</div>
          <div className="stats-label">Pending</div>
        </div>
        <div className="stats-card gradient-blue">
          <div className="stats-icon">✓</div>
          <div className="stats-value">{approvedRegistrations.length}</div>
          <div className="stats-label">Approved</div>
        </div>
        <div className="stats-card gradient-orange">
          <div className="stats-icon">👥</div>
          <div className="stats-value">{pendingRegistrations.length + approvedRegistrations.length}</div>
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
            Pending ({pendingRegistrations.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            Approved ({approvedRegistrations.length})
          </button>
        </div>

        {/* Registrations List */}
        <div className="registrations-list">
          {activeTab === "pending" && (
            <>
              {pendingRegistrations.length === 0 ? (
                <div className="empty-state">
                  <p>No pending registrations</p>
                </div>
              ) : (
                pendingRegistrations.map((reg) => (
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
              {approvedRegistrations.length === 0 ? (
                <div className="empty-state">
                  <p>No approved registrations</p>
                </div>
              ) : (
                approvedRegistrations.map((reg) => (
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

      {/* Success Popup */}
      {showPopup && (
        <div className="popup">
          <span className="popup-icon">✓</span>
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Registrations;
