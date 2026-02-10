import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./Dashboard.css";

function Dashboard({
  onNavigateToNotifications,
  onNavigateToMyEvents,
  onNavigateToCreateEvent,
  onNavigateToRegistrations,
  profileData,
  events = [],
  isMenuOpen,
  onToggleMenu
}) {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const userName = profileData?.name?.split(' ')[0] || "Admin";

  // Calculate stats from actual events data
  const totalEvents = events.length;
  const approvedEvents = events.filter(e => e.status === "Approved").length;
  const pendingEvents = events.filter(e => e.status === "Pending").length;

  // Check if image is an uploaded image (data URL)
  const isUploadedImage = (image) => image && image.startsWith('data:image');

  return (
    <div className={`dashboard-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <button className={`menu-toggle-btn-inline ${isMenuOpen ? 'active' : ''}`} onClick={onToggleMenu}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          <div className="header-content">
            <h1>Welcome {userName}</h1>
            <p>Here's your event overview</p>
          </div>
        </div>
        
        <div className="header-actions-right">
          <button className="notification-btn" onClick={onNavigateToNotifications}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
            </svg>
          </button>
            
          {/* Dark/Light Mode Toggle */}
          <button 
            className={`theme-toggle-btn ${isDarkMode ? 'dark' : 'light'}`} 
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stats-card gradient-blue">
          <div className="stats-icon">📅</div>
          <div className="stats-value">{totalEvents}</div>
          <div className="stats-label">Total Events</div>
        </div>
        <div className="stats-card gradient-purple">
          <div className="stats-icon">✓</div>
          <div className="stats-value">{approvedEvents}</div>
          <div className="stats-label">Approved</div>
        </div>
        <div className="stats-card gradient-orange">
          <div className="stats-icon">⏳</div>
          <div className="stats-value">{pendingEvents}</div>
          <div className="stats-label">Pending</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="quick-action-card" onClick={onNavigateToCreateEvent}>
          <div className="action-icon-wrapper">
            <span className="action-icon">+</span>
          </div>
          <p>Create Event</p>
        </div>
        <div className="quick-action-card" onClick={onNavigateToMyEvents}>
          <div className="action-icon-wrapper">
            <span className="action-icon">📅</span>
          </div>
          <p>My Events</p>
        </div>
        <div className="quick-action-card" onClick={onNavigateToRegistrations}>
          <div className="action-icon-wrapper">
            <span className="action-icon">👥</span>
          </div>
          <p>Registrations</p>
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="section">
        <div className="section-header">
          <h2>Recent Events</h2>
          <button className="view-all-btn" onClick={onNavigateToMyEvents}>View All →</button>
        </div>

        <div className="events-list">
          {events.length > 0 ? (
            events.slice(0, 3).map(event => (
              <div className="event-card" key={event.id} onClick={() => onNavigateToMyEvents()}>
                {isUploadedImage(event.image) ? (
                  <div className="event-image gradient-blue uploaded">
                    <img src={event.image} alt={event.title} />
                  </div>
                ) : (
                  <div className={`event-image gradient-${event.image === 'AI' || event.image === 'ML' ? 'purple' : 'blue'}`}>
                    <span>{event.image}</span>
                  </div>
                )}
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p>📅 {event.date} • ⏰ {event.time}</p>
                </div>
                <span className={`status-badge ${event.status.toLowerCase()}`}>{event.status}</span>
              </div>
            ))
          ) : (
            <p className="no-events">No events yet. Create your first event!</p>
          )}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="section">
        <div className="section-header">
          <h2>Notifications</h2>
        </div>

        <div className="notifications-list">
          <div className="notification-item" onClick={onNavigateToRegistrations}>
            <div className="notification-icon-wrapper">
              <span className="notification-icon">👥</span>
            </div>
            <div className="notification-info">
              <p className="notification-title">New Registration</p>
              <p className="notification-desc">John Doe registered for AI Workshop</p>
            </div>
            <span className="notification-time">2m ago</span>
          </div>

          <div className="notification-item" onClick={onNavigateToMyEvents}>
            <div className="notification-icon-wrapper">
              <span className="notification-icon">📅</span>
            </div>
            <div className="notification-info">
              <p className="notification-title">Event Reminder</p>
              <p className="notification-desc">Web Dev Workshop starts tomorrow</p>
            </div>
            <span className="notification-time">1h ago</span>
          </div>

          <div className="notification-item" onClick={onNavigateToRegistrations}>
            <div className="notification-icon-wrapper success">
              <span className="notification-icon">✓</span>
            </div>
            <div className="notification-info">
              <p className="notification-title">Registration Approved</p>
              <p className="notification-desc">Emma Wilson approved for AI Workshop</p>
            </div>
            <span className="notification-time">3h ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
