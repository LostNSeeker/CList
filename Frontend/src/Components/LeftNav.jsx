import "./LeftNav.css"; // Make sure to create a corresponding CSS file for styling
import { Link } from "react-router-dom";
import homeIcon from "/home.svg";
import contestsIcon from "/contests.svg";
import eventsIcon from "/events.svg";
import solvedIcon from "/previous-ques.svg";

const LeftNav = () => {
	return (
		<div className="left-nav-bar">
			<ul className="nav-item" data-tooltip="Home">
				<Link to="/">
					{/* <img src={homeIcon} alt="Home" /> */}
					<i className="fas fa-home fa-2x"></i>
				</Link>
			</ul>
			<ul className="nav-item" data-tooltip="Contests">
				<Link to="/contests">
					{/* <img src={contestsIcon} alt="Contests" /> */}
					<i className="fas fa-trophy fa-2x"></i>
				</Link>
			</ul>
			<ul className="nav-item" data-tooltip="Events">
				<Link to="/events">
					{/* <img src={eventsIcon} alt="Events" /> */}
					<i className="fas fa-calendar-alt fa-2x"></i>
				</Link>
			</ul>
			<ul className="nav-item" data-tooltip="Previous Solved questions">
				<Link to="/solvedQuestions">
					{/* <img src={solvedIcon} alt="solved" /> */}
					<i className="fas fa-history fa-2x"></i>
				</Link>
			</ul>
		</div>
	);
};

export default LeftNav;
