import "./LeftNav.css"; // Make sure to create a corresponding CSS file for styling
import homeIcon from "/public/home.svg";
import contestsIcon from "/public/contests.svg";
import menuIcon from "/public/menu.svg";

const LeftNav = () => {
  return (
    <div className="left-nav-bar">
      <ul>
        <img src={menuIcon} />
      </ul>
      <ul>
        <a href="/home">
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
