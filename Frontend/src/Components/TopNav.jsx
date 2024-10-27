import "./TopNav.css"; // Assuming you will add some styles
import mailIcon from "/public/mail.svg";
import notificationIcon from "/public/notification.svg";
import profileIcon from "/public/profile.svg";

const TopNav = () => {
  return (
    <nav className="top-nav">
      <div className="space"></div>
      <div className="right-side">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <div className="profile-box">
          <a href="/" className="icon-button">
            <img src={mailIcon}/>
          </a>
          <a href="/" className="icon-button">
            <img src={notificationIcon}/>
          </a>
          <a href="/" className="icon-button">
            <img src={profileIcon}/>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
