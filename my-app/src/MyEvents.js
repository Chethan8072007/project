import React, { useState } from "react";
import "./MyEvents.css";

function MyEvents({ onBack, onViewDetails, events }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "approved") return event.status === "Approved";
    if (activeFilter === "pending") return event.status === "Pending";
    if (activeFilter === "rejected") return event.status === "Rejected";
    return true;
  });

  const getGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    ];
    return gradients[index % gradients.length];
  };

  const handleViewDetails = (eventId) => {
    if (onViewDetails) {
      onViewDetails(eventId);
    }
  };

  // Check if image is an uploaded image (data URL)
  const isUploadedImage = (image) => image && image.startsWith('data:image');

  return (
    <div className="my-events-page">
      {/* Header */}
      <div className="my-events-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>My Events</h1>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Events
        </button>
        <button
          className={`filter-btn ${activeFilter === "approved" ? "active" : ""}`}
          onClick={() => setActiveFilter("approved")}
        >
          Approved
        </button>
        <button
          className={`filter-btn ${activeFilter === "pending" ? "active" : ""}`}
          onClick={() => setActiveFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${activeFilter === "rejected" ? "active" : ""}`}
          onClick={() => setActiveFilter("rejected")}
        >
          Rejected
        </button>
      </div>

      {/* Events List */}
      <div className="events-list">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className="event-card"
            style={{ background: getGradient(index) }}
            onClick={() => handleViewDetails(event.id)}
          >
            {isUploadedImage(event.image) ? (
              <div className="event-image uploaded">
                <img src={event.image} alt={event.title} />
              </div>
            ) : (
              <div className="event-image">{event.image}</div>
            )}
            <div className="event-info">
              <h3>{event.title}</h3>
              <p className="event-date">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                </svg>
                {event.date}
              </p>
              <p className="event-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                {event.time}
              </p>
            </div>
            <span className={`status-badge ${event.status.toLowerCase()}`}>
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEvents;
