// Desc: Home page for the application
import "./Home.css";
import Contests from "../Components/Contests";
import Scoreboard from "../Components/Scoreboard";
//import Chart from '../Components/Chart';
import Rating from "../Components/Rating";
import Events from "../Components/Events";

const Home = () => {
  return (
    <div className="home-screen">
      <div className="upper-box">
        <div className="box" id="scoreboard">
          <Scoreboard />
        </div>
        <div className="rating-box">
          <Rating />
        </div>
      </div>

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
