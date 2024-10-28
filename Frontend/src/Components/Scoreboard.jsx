import TotalContests from "./TotalContests";
import ProblemSolved from "./ProblemSolved";
import "./Scoreboard.css";
import CircularProgress from "./CircularProgress";

const Scoreboard = () => {
  return (
    <div className="board-container">
      <div className="upper-board">
        <TotalContests />
        <ProblemSolved />
      </div>
      <div className="lower-board">
        <div className="coding-platform">
          <CircularProgress progress="50" />
          <div>Codeforces</div>
        </div>
        <div className="coding-platform">
          <CircularProgress progress="70" />
          <div>Leetcode</div>
        </div>
        <div className="coding-platform">
          <CircularProgress progress="30" />
          <div>Codechef</div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
