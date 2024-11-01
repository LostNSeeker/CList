import "./TopNav.css"; // Assuming you will add some styles
import { useState } from "react";
import mailIcon from "/mail.svg";
import notificationIcon from "/notification.svg";
import profileIcon from "/profile.svg";
import homeIcon from "/home.svg";
import contestsIcon from "/contests.svg";
import eventsIcon from "/events.svg";
import progressIcon from "/progress.svg";

const TopNav = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <nav className="top-nav">
      <div className="space"></div>
      <div className="right-side">
        <div className="top-menu">
          <ul>
            <a href="/">
              <img src={homeIcon} />
            </a>
          </ul>
          <ul>
            <a href="/contests">
              <img src={contestsIcon} />
            </a>
          </ul>
          <ul>
            <a href="/rating">
              <img src={progressIcon} />
            </a>
          </ul>
          <ul>
            <a href="/events">
              <img src={eventsIcon} />
            </a>
          </ul>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <div className="profile-box">
          <a href="/" className="icon-button">
            <img src={mailIcon} />
          </a>
          <button onClick={handleNotificationClick} className="icon-button">
            <img src={notificationIcon} alt="Notifications" />
          </button>
          {showNotifications && (
            <div className="notification-panel">
              <h3>Notifications</h3>
              <ul>
                <li>You have a new message</li>
                <li>Upcoming event tomorrow</li>
                <li>Contest starts in 2 hours</li>
                <li>Profile update needed</li>
              </ul>
            </div>
          )}
          <a href="/" className="icon-button">
            <img src={profileIcon} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
