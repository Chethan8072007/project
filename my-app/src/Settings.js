import React, { useState, useContext } from "react";
import { DarkModeContext } from "./App";
import "./Settings.css";

function Settings({ onBack, onNotificationSettings }) {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [settings, setSettings] = useState({
    darkMode: isDarkMode,
    emailNotifications: true,
    smsNotifications: false,
  });
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleToggleSetting = (key) => {
    if (key === "darkMode") {
      toggleDarkMode();
    }
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Sync local state with context when component mounts
  React.useEffect(() => {
    setSettings((prev) => ({ ...prev, darkMode: isDarkMode }));
  }, [isDarkMode]);

  const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese"];

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Settings</h1>
      </div>

      {/* Settings List */}
      <div className="settings-list">
        {/* Dark Mode */}
        <div className="settings-item">
          <div className="settings-info">
            <h3>Dark Mode</h3>
          </div>
          <button
            className={`toggle-btn ${settings.darkMode ? "active" : ""}`}
            onClick={() => handleToggleSetting("darkMode")}
          >
            <span className="toggle-slider"></span>
          </button>
        </div>

        {/* Email Notifications */}
        <div className="settings-item">
          <div className="settings-info">
            <h3>Email Notifications</h3>
          </div>
          <button
            className={`toggle-btn ${settings.emailNotifications ? "active" : ""}`}
            onClick={() => handleToggleSetting("emailNotifications")}
          >
            <span className="toggle-slider"></span>
          </button>
        </div>

        {/* SMS Notifications */}
        <div className="settings-item">
          <div className="settings-info">
            <h3>SMS Notifications</h3>
          </div>
          <button
            className={`toggle-btn ${settings.smsNotifications ? "active" : ""}`}
            onClick={() => handleToggleSetting("smsNotifications")}
          >
            <span className="toggle-slider"></span>
          </button>
        </div>

        {/* Language */}
        <div className="settings-item language-item">
          <div className="settings-info">
            <h3>Language</h3>
          </div>
          <select
            className="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Notification Settings */}
        <div className="settings-item clickable" onClick={onNotificationSettings}>
          <div className="settings-info">
            <h3>Notification Settings</h3>
          </div>
          <span className="arrow-icon">→</span>
        </div>
      </div>
    </div>
  );
}

export default Settings;
