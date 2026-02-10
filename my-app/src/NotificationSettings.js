import React, { useState, useContext } from "react";
import { DarkModeContext } from "./App";
import "./NotificationSettings.css";

function NotificationSettings({ onBack, onSave }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const [settings, setSettings] = useState({
    pushNotification: true,
    emailNotification: false,
    smsNotification: false,
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleToggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      if (onSave) onSave();
    }, 1500);
  };

  return (
    <div className={`notification-settings-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="notification-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Notification Settings</h1>
      </div>

      {/* Notification Options */}
      <div className="notification-list">
        {/* Push Notification */}
        <div className="notification-item">
          <div className="notification-info">
            <h3>Push Notification</h3>
          </div>
          <button
            className={`toggle-btn ${settings.pushNotification ? "active" : ""}`}
            onClick={() => handleToggleSetting("pushNotification")}
          >
            <span className="toggle-slider"></span>
          </button>
        </div>

        {/* Email Notification */}
        <div className="notification-item">
          <div className="notification-info">
            <h3>Email Notification</h3>
          </div>
          <button
            className={`toggle-btn ${settings.emailNotification ? "active" : ""}`}
            onClick={() => handleToggleSetting("emailNotification")}
          >
            <span className="toggle-slider"></span>
          </button>
        </div>

        {/* SMS Notification */}
        <div className="notification-item">
          <div className="notification-info">
            <h3>SMS Notification</h3>
          </div>
          <button
            className={`toggle-btn ${settings.smsNotification ? "active" : ""}`}
            onClick={() => handleToggleSetting("smsNotification")}
          >
            <span className="toggle-slider"></span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="save-button-container">
        <button className="save-settings-btn" onClick={handleSave}>
          Save Settings
        </button>
      </div>

      {/* Success Popup with Backdrop */}
      {showPopup && (
        <>
          <div className="popup-backdrop" onClick={() => setShowPopup(false)} />
          <div className="popup">
            <div className="checkmark">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <p>Saved Successfully!</p>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationSettings;
