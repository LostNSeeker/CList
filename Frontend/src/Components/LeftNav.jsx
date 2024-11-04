import "./LeftNav.css"; // Make sure to create a corresponding CSS file for styling
import homeIcon from "/home.svg";
import contestsIcon from "/contests.svg";
import eventsIcon from "/events.svg";

const LeftNav = () => {
  return (
    <div className="left-nav-bar">
      <ul className="nav-item" data-tooltip="Home">
        <a href="/">
          <img src={homeIcon} alt="Home" />
        </a>
      </ul>
      <ul className="nav-item" data-tooltip="Contests">
        <a href="/contests">
          <img src={contestsIcon} alt="Contests" />
        </a>
      </ul>
      <ul className="nav-item" data-tooltip="Events">
        <a href="/events">
          <img src={eventsIcon} alt="Events" />
        </a>
      </ul>
    </div>
  );
};

export default LeftNav;
