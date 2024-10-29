import "./LeftNav.css"; // Make sure to create a corresponding CSS file for styling
import homeIcon from "/home.svg";
import contestsIcon from "/contests.svg";
import eventsIcon from "/events.svg";
import progressIcon from "/progress.svg";

const LeftNav = () => {
  return (
    <div className="left-nav-bar">
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
  );
};

export default LeftNav;
