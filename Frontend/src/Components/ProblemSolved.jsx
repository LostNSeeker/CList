
import upperArrowIcon from "/upperArrow.svg";
import totalProblemIcon from "/totalProblem.svg";
import "./TotalContests.css";

const ProblemSolved = () => {
    return (
        <div className="total-container">
            <div className="icon">
        <img src={totalProblemIcon} />
      </div>
      <div className="number">
        <p className="contest-number">250</p>
        <div className="head-p">Pronblem solved</div>
        <div>
          <img src={upperArrowIcon} />
          10% (07 days)
        </div>
      </div>
        </div>
    );
};

export default ProblemSolved;