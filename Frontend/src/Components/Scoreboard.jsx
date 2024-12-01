//import TotalContests from "./TotalContests";
//import ProblemSolved from "./ProblemSolved";
import "./Scoreboard.css";
//import CircularProgress from "./CircularProgress";
import { PieChartQuestions } from "./pieChartQuestions";
import { PieChartContests } from "./pieChartContests";  
import CurrentRatings from "./currentRattings";

const Scoreboard = () => {
  return (
    <div className="board-container">
      {/*<div className="upper-board">
        <TotalContests />
        <ProblemSolved />
      </div>*/}
      <div className="lower-board">
        <PieChartContests />
        <PieChartQuestions />
      </div>
      <CurrentRatings />
    </div>
  );
};

export default Scoreboard;
