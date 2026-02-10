import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Notifications from "./Notifications";
import MyEvents from "./MyEvents";
import EventDetails from "./EventDetails";
import CreateEvent from "./CreateEvent";
import Registrations from "./Registrations";
import ViewRegistrations from "./ViewRegistrations";
import NotificationSettings from "./NotificationSettings";
import EditEvent from "./EditEvent";
import NewRegistrationMembers from "./NewRegistrationMembers";
import RegisteredMembers from "./RegisteredMembers";
import RejectedRegistrations from "./RejectedRegistrations";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import BottomNavigation from "./BottomNavigation";
import "./App.css";

export const DarkModeContext = React.createContext();

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarahjohnson@gmail.com",
    phone: "+91 98765 43210",
    role: "Computer Science",
    avatar: null,
  });
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "AI & Machine Learning",
      date: "Feb 15, 2025",
      time: "10:00 AM",
      image: "AI",
      status: "Approved",
    },
    {
      id: 2,
      title: "Web Development Workshop",
      date: "Feb 25, 2025",
      time: "11:00 AM",
      image: "</>",
      status: "Approved",
    },
  ]);

  // Shared registration state
  const [newRegistrations, setNewRegistrations] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", avatar: "JS", date: "10:30 AM", event: "Tech Conference 2024" },
    { id: 2, name: "Emma Wilson", email: "emma@example.com", avatar: "EW", date: "09:15 AM", event: "Music Festival" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", avatar: "MB", date: "Yesterday", event: "Art Exhibition" },
  ]);
  const [registeredMembers, setRegisteredMembers] = useState([
    { id: 4, name: "Sarah Davis", email: "sarah@example.com", avatar: "SD", status: "Approved" },
    { id: 5, name: "James Wilson", email: "james@example.com", avatar: "JW", status: "Approved" },
  ]);
  const [rejectedRegistrations, setRejectedRegistrations] = useState([
    { id: 6, name: "David Lee", email: "david@example.com", avatar: "DL", status: "Rejected" },
  ]);

  const handleApproveRegistration = (id) => {
    const reg = newRegistrations.find(r => r.id === id);
    if (reg) {
      setNewRegistrations(newRegistrations.filter(r => r.id !== id));
      setRegisteredMembers([...registeredMembers, { ...reg, status: "Approved" }]);
    }
  };

  const handleRejectRegistration = (id) => {
    const reg = newRegistrations.find(r => r.id === id);
    if (reg) {
      setNewRegistrations(newRegistrations.filter(r => r.id !== id));
      setRejectedRegistrations([...rejectedRegistrations, { ...reg, status: "Rejected" }]);
    }
  };

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
  };

  const navigateToNotifications = () => {
    setCurrentPage("notifications");
  };

  const navigateToMyEvents = () => {
    setCurrentPage("myEvents");
  };

  const navigateToCreateEvent = () => {
    setCurrentPage("createEvent");
  };

  const navigateToRegistrations = () => {
    setCurrentPage("registrations");
  };

  const navigateToNewRegistrationMembers = () => {
    setCurrentPage("newRegistrationMembers");
  };

  const navigateToRegisteredMembers = () => {
    setCurrentPage("registeredMembers");
  };

  const navigateToRejectedRegistrations = () => {
    setCurrentPage("rejectedRegistrations");
  };

  const navigateToDashboard = () => {
    setCurrentPage("dashboard");
  };

  const navigateToMyEventsFromDetails = () => {
    setCurrentPage("myEvents");
  };

  const navigateToProfile = () => {
    setCurrentPage("profile");
  };

  const navigateToEditProfile = () => {
    setCurrentPage("editProfile");
  };

  const navigateToSettings = () => {
    setCurrentPage("settings");
  };

  const navigateToNotificationSettings = () => {
    setCurrentPage("notificationSettings");
  };

  const navigateToLogout = () => {
    alert("Logout clicked!");
  };

  const handleViewDetails = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentPage("eventDetails");
  };

  const handleCreateEventSubmit = (eventData) => {
    const newEvent = {
      id: events.length + 1,
      title: eventData.eventName,
      date: eventData.date,
      time: eventData.time,
      image: eventData.eventImage || eventData.eventName.substring(0, 2).toUpperCase(),
      status: "Pending",
    };
    setEvents([...events, newEvent]);
    
    // Auto-approve event after 1 minute
    setTimeout(() => {
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === newEvent.id 
            ? { ...event, status: "Approved" } 
            : event
        )
      );
    }, 60000); // 1 minute = 60000 ms
    
    setCurrentPage("dashboard");
  };

  const handleEditEventSubmit = (eventId, eventData) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, title: eventData.eventName, date: eventData.date, time: eventData.time, image: eventData.eventImage || eventData.image || event.image }
        : event
    ));
    setCurrentPage("eventDetails");
  };

  const handleUpdateProfile = (updatedData) => {
    setProfileData(updatedData);
  };

  const navigateToEditEvent = () => {
    setCurrentPage("editEvent");
  };

  const navigateToViewRegistrations = () => {
    setCurrentPage("viewRegistrations");
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Pages that should show bottom navigation
  const showBottomNav = ["dashboard", "myEvents", "profile"].includes(currentPage);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
        {currentPage === "dashboard" && (
          <Dashboard
            onNavigateToNotifications={navigateToNotifications}
            onNavigateToMyEvents={navigateToMyEvents}
            onNavigateToCreateEvent={navigateToCreateEvent}
            onNavigateToRegistrations={navigateToRegistrations}
            profileData={profileData}
            events={events}
            isMenuOpen={isMenuOpen}
            onToggleMenu={toggleMenu}
          />
        )}
        {currentPage === "notifications" && (
          <Notifications
            onBack={navigateToDashboard}
            onNavigateToNewRegistration={navigateToNewRegistrationMembers}
            onNavigateToRegisteredMembers={navigateToRegisteredMembers}
            onNavigateToRejectedRegistrations={navigateToRejectedRegistrations}
            newRegistrationsCount={newRegistrations.length}
            registeredMembersCount={registeredMembers.length}
            rejectedRegistrationsCount={rejectedRegistrations.length}
          />
        )}
        {currentPage === "myEvents" && (
          <MyEvents
            onBack={navigateToDashboard}
            onViewDetails={handleViewDetails}
            events={events}
          />
        )}
        {currentPage === "eventDetails" && (
          <EventDetails
            onBack={navigateToMyEventsFromDetails}
            eventId={selectedEventId}
            events={events}
            onEditEvent={navigateToEditEvent}
            onViewRegistration={navigateToViewRegistrations}
            onDeleteEvent={handleDeleteEvent}
            onHome={navigateToMyEvents}
          />
        )}
        {currentPage === "createEvent" && (
          <CreateEvent
            onBack={navigateToDashboard}
            onSubmit={handleCreateEventSubmit}
          />
        )}
        {currentPage === "editEvent" && (
          <EditEvent
            onBack={() => setCurrentPage("eventDetails")}
            onUpdate={handleEditEventSubmit}
            eventId={selectedEventId}
            events={events}
          />
        )}
        {currentPage === "viewRegistrations" && (
          <ViewRegistrations
            onBack={() => setCurrentPage("eventDetails")}
            eventId={selectedEventId}
            events={events}
          />
        )}
        {currentPage === "registrations" && (
          <Registrations 
            onBack={navigateToDashboard}
            newRegistrations={newRegistrations}
            registeredMembers={registeredMembers}
            onApprove={handleApproveRegistration}
            onReject={handleRejectRegistration}
          />
        )}
        {currentPage === "newRegistrationMembers" && (
          <NewRegistrationMembers 
            onBack={navigateToNotifications}
            registrations={newRegistrations}
            onApprove={handleApproveRegistration}
          />
        )}
        {currentPage === "registeredMembers" && (
          <RegisteredMembers 
            onBack={navigateToNotifications}
            members={registeredMembers}
          />
        )}
        {currentPage === "rejectedRegistrations" && (
          <RejectedRegistrations 
            onBack={navigateToNotifications}
            rejected={rejectedRegistrations}
          />
        )}
        {currentPage === "profile" && (
          <Profile
            onBack={navigateToDashboard}
            onEditProfile={navigateToEditProfile}
            onSettings={navigateToSettings}
            onLogout={navigateToLogout}
            profileData={profileData}
          />
        )}
        {currentPage === "editProfile" && (
          <EditProfile 
            onBack={navigateToProfile}
            onSave={handleUpdateProfile}
            initialData={profileData}
          />
        )}
        {currentPage === "settings" && (
          <Settings 
            onBack={navigateToProfile}
            onNotificationSettings={navigateToNotificationSettings}
          />
        )}
        {currentPage === "notificationSettings" && (
          <NotificationSettings 
            onBack={() => setCurrentPage("settings")}
            onSave={() => setCurrentPage("settings")}
          />
        )}
        {showBottomNav && (
          <BottomNavigation
            currentPage={currentPage}
            onNavigate={navigateTo}
            onProfileClick={navigateToProfile}
            isMenuOpen={isMenuOpen}
            onToggleMenu={toggleMenu}
            onLogout={navigateToLogout}
          />
        )}
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
