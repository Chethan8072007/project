import React, { useState, useContext, useRef } from "react";
import { DarkModeContext } from "./App";
import "./EditProfile.css";

function EditProfile({ onBack, onSave, initialData }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const defaultData = {
    name: "Dr. Sarah Johnson",
    email: "sarahjohnson@gmail.com",
    phone: "+91 98765 43210",
    role: "Computer Science",
    avatar: null,
  };
  const data = initialData || defaultData;
  
  const [formData, setFormData] = useState(data);
  const [showPopup, setShowPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      if (onSave) {
        onSave(formData);
      }
      onBack();
    }, 1500);
  };

  // Get avatar initials
  const getAvatarInitials = () => {
    if (formData.avatar) return null;
    return formData.name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <div className={`edit-profile-page ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Header */}
      <div className="edit-profile-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Edit Profile</h1>
      </div>

      {/* Profile Photo */}
      <div className="edit-profile-photo">
        <div className="avatar-large">
          {formData.avatar ? (
            <img 
              src={formData.avatar} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }}
            />
          ) : (
            getAvatarInitials()
          )}
        </div>
        <button 
          className="camera-btn" 
          onClick={handleCameraClick}
          disabled={isUploading}
        >
          {isUploading ? (
            <svg className="spinner" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <style>{`
                .spinner {
                  animation: spin 1s linear infinite;
                }
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              <path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 14H9V3h12v12z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Form Fields */}
      <div className="edit-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Save Button */}
      <button className="save-btn" onClick={handleSave}>
        Save
      </button>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup">
          <span className="checkmark">✓</span>
          <p>Saved Successfully!</p>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
