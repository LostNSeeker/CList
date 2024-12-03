// Desc: Home page for the application
import "./Home.css";
import Contests from "../Components/Contests";
import Scoreboard from "../Components/Scoreboard";
//import Chart from '../Components/Chart';
//import Rating from "../Components/Rating";
import Events from "../Components/Events";
//import CurrentRatings from "../Components/currentRattings";
import { auth } from "../../config/firebaseConfig";

const Home = () => {
	// if (location.pathname !== "/") {
	// 	window.location.href = "/";
	// }

	if (!auth.currentUser) {
		window.location.href = "/login";
	}

	return (
		<div className="home-screen">
			{/*<div className="upper-box">
        <div className="box" id="scoreboard">
          <Scoreboard />
        </div>
        {/*<div className="rating-box">
          <Rating />
        </div>*/
			/*}
      </div>*/}

			<Scoreboard />

			<div className="box">
				<Contests />
			</div>

			<div className="event-box">
				<Events />
			</div>
		</div>
	);
};

export default Home;
