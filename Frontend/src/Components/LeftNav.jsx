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
          {/* <img src={homeIcon} alt="Home" /> */}
          <i class="fas fa-home fa-2x"></i>

        </a>
      </ul>
      <ul className="nav-item" data-tooltip="Contests">
        <a href="/contests">
          {/* <img src={contestsIcon} alt="Contests" /> */}
          <i class="fas fa-trophy fa-2x"></i>

        </a>
      </ul>
      <ul className="nav-item" data-tooltip="Events">
        <a href="/events">
          {/* <img src={eventsIcon} alt="Events" /> */}
          <i class="fas fa-calendar-alt fa-2x"></i>

        </a>
      </ul>
      <ul className="nav-item" data-tooltip="Previous Solved questions">
        <a href="/solvedQuestions">
          {/* <img src={solvedIcon} alt="solved" /> */}
          <i class="fas fa-history fa-2x"></i>

        </a>
      </ul>
    </div>
  );
};

export default LeftNav;
