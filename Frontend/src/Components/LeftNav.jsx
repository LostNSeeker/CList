import "./LeftNav.css"; // Make sure to create a corresponding CSS file for styling
import homeIcon from "/home.svg";
import contestsIcon from "/contests.svg";
import menuIcon from "/menu.svg";

const LeftNav = () => {
  return (
    <div className="left-nav-bar">
      <ul>
        <img src={menuIcon} />
      </ul>
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
        <a href="/">Events</a>
      </ul>
    </div>
  );
};

export default LeftNav;
