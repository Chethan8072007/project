import React, { useState } from "react";
import "./CreateEvent.css";

function CreateEvent({ onBack, onSubmit }) {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Technology");
  const [eventImage, setEventImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleCreateEvent = () => {
    if (!eventName || !description || !date || !time) {
      setPopupMessage("Please fill in all fields");
      setShowPopup(true);
      return;
    }

    // Show success popup
    setPopupMessage("Event created successfully!");
    setShowPopup(true);

    // Call onSubmit callback to navigate back after delay
    setTimeout(() => {
      if (onSubmit) {
        onSubmit({
          eventName,
          description,
          date,
          time,
          category,
          eventImage,
        });
      }
    }, 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEventImage(null);
  };

  return (
    <div className="create-event-page">
      {/* Header */}
      <div className="create-event-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Create Event</h1>
      </div>

      {/* Form */}
      <div className="create-event-form">
        {/* Image Upload */}
        <div className="form-group">
          <label>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            Event Image
          </label>
          <div className="image-upload-container">
            {eventImage ? (
              <div className="image-preview">
                <img src={eventImage} alt="Event" />
                <button className="remove-image-btn" onClick={handleRemoveImage}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            ) : (
              <label className="upload-placeholder">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                <span>Tap to upload photo</span>
              </label>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            Event Name
          </label>
          <input
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h0-4H8v-2h8v28v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            Description
          </label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
              </svg>
              Date
            </label>
            <input
              type="text"
              placeholder="Feb 15, 2025"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              Time
            </label>
            <input
              type="text"
              placeholder="10:00 AM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Technology">Technology</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
            <option value="Seminar">Seminar</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Create Button */}
        <button className="create-event-btn" onClick={handleCreateEvent}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Create Event
        </button>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className={`popup ${popupMessage.includes("successfully") ? "success" : "error"}`}>
          <div className="popup-icon">
            {popupMessage.includes("successfully") ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            )}
          </div>
          <p className="popup-message">{popupMessage}</p>
        </div>
      )}
    </div>
  );
}

export default CreateEvent;
