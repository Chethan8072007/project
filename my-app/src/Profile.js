import React from "react";
import "./Profile.css";

function Profile({ onBack, onEditProfile, onSettings, onLogout, profileData }) {
  const data = profileData || {
    name: "Dr. Sarah Johnson",
    email: "sarahjohnson@gmail.com",
    phone: "+91 98765 43210",
    role: "Computer Science",
    avatar: null,
  };

  // Get avatar initials
  const getAvatarInitials = () => {
    if (data.avatar) return null;
    return data.name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1>Profile</h1>
        <button className="edit-profile-btn" onClick={onEditProfile}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </div>

      {/* Profile Photo */}
      <div className="profile-photo-section">
        <div className="avatar-large">
          {data.avatar ? (
            <img 
              src={data.avatar} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }}
            />
          ) : (
            getAvatarInitials()
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-info-section">
        <div className="info-card">
          <div className="info-row">
            <span className="info-label">Name</span>
            <span className="info-value">{data.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{data.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Phone</span>
            <span className="info-value">{data.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Role</span>
            <span className="info-value">{data.role}</span>
          </div>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="profile-actions">
        <button className="settings-btn" onClick={onSettings}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
          Settings
        </button>
      </div>

      {/* Additional Actions */}
      <div className="additional-actions">
        <button className="change-password-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          Change Password
        </button>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-btn" onClick={onLogout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
