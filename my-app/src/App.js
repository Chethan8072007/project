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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
          />
        )}
        {currentPage === "notifications" && (
          <Notifications
            onBack={navigateToDashboard}
            onNavigateToNewRegistration={navigateToNewRegistrationMembers}
            onNavigateToRegisteredMembers={navigateToRegisteredMembers}
            onNavigateToRejectedRegistrations={navigateToRejectedRegistrations}
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
          <Registrations onBack={navigateToDashboard} />
        )}
        {currentPage === "newRegistrationMembers" && (
          <NewRegistrationMembers onBack={navigateToNotifications} />
        )}
        {currentPage === "registeredMembers" && (
          <RegisteredMembers onBack={navigateToNotifications} />
        )}
        {currentPage === "rejectedRegistrations" && (
          <RejectedRegistrations onBack={navigateToNotifications} />
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
          />
        )}
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
