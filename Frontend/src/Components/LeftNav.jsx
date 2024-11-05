import "./LeftNav.css"; // Make sure to create a corresponding CSS file for styling
import homeIcon from "/home.svg";
import contestsIcon from "/contests.svg";
import eventsIcon from "/events.svg";
import solvedIcon from "/previous-ques.svg";

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
      <ul className="nav-item" data-tooltip="Previous Solved questions">
        <a href="/solvedQuestions">
          <img src={solvedIcon} alt="solved" />
        </a>
      </ul>
    </div>
  );
};

export default LeftNav;
