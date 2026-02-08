import React from "react";
import "./EventDetails.css";

function EventDetails({ onBack, eventId, events, onEditEvent, onViewRegistration }) {
  const handleEditEvent = () => {
    if (onEditEvent) {
      onEditEvent();
    }
  };

  const handleViewRegistration = () => {
    if (onViewRegistration) {
      onViewRegistration();
    }
  };

  // Find the event based on eventId
  const event = events.find((e) => e.id === eventId);

  const registrations = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe123@gmail.com",
      phone: "+91 98765 43210",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith123@gmail.com",
      phone: "+91 98765 43211",
      avatar: "JS",
    },
  ];

  // Use event data or fallback to defaults
  const eventTitle = event ? event.title : "AI & Machine Learning Workshop";
  const eventDate = event ? event.date : "Friday, Feb 15, 2025";
  const eventTime = event ? event.time : "10:00 AM - 11:00 AM";
  const eventStatus = event ? event.status : "Approved";
  const eventImage = event ? event.image : null;
  // Check if image is an uploaded image (data URL) - only show thumbnail for uploaded images
  const isUploadedImage = eventImage && eventImage.startsWith('data:image');

  return (
    <div className="event-details-page">
      {/* Header */}
      <div className="event-details-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Event Details</h1>
      </div>

      {/* Event Info Card */}
      <div className="event-info-card">
        {/* Event Icon */}
        <div className="event-icon">📅</div>
        <div className="event-details-info">
          <h2 className="event-title">{eventTitle}</h2>
          <p className="event-date">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            {eventDate}
          </p>
          <p className="event-time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            {eventTime}
          </p>
        </div>
        <span className={`status-badge ${eventStatus.toLowerCase()}`}>
          {eventStatus}
        </span>
      </div>

      {/* Uploaded Image Thumbnail */}
      {isUploadedImage && (
        <div className="event-image-container">
          <img src={eventImage} alt="Event" className="event-image-thumbnail" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="event-actions">
        <button className="action-btn primary" onClick={handleEditEvent}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          Edit Event
        </button>
        <button className="action-btn secondary" onClick={handleViewRegistration}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          View Registration
        </button>
      </div>

      {/* Registrations Section */}
      <div className="registrations-section">
        <div className="registrations-header">
          <h2>Registrations</h2>
          <span className="total-count">({registrations.length})</span>
        </div>

        {registrations.map((reg) => (
          <div key={reg.id} className="registration-card">
            <div className="reg-avatar">{reg.avatar}</div>
            <div className="reg-info">
              <h3>{reg.name}</h3>
              <p className="reg-email">{reg.email}</p>
              <p className="reg-phone">{reg.phone}</p>
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

export default EventDetails;
