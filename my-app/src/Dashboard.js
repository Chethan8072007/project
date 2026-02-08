import React, { useContext } from "react";
import { DarkModeContext } from "./App";
import "./Dashboard.css";

function Dashboard({
  onNavigateToNotifications,
  onNavigateToMyEvents,
  onNavigateToCreateEvent,
  onNavigateToRegistrations,
  profileData,
  events = []
}) {
  const { isDarkMode } = useContext(DarkModeContext);
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
        <div className="header-content">
          <h1>Welcome {userName}</h1>
          <p>Here's your event overview</p>
        </div>
        <button className="notification-btn" onClick={onNavigateToNotifications}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
          </svg>
          <span className="notification-badge">3</span>
        </button>
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
