import totalContestsIcon from "/totalContestsIcon.svg";
import upperArrowIcon from "/upperArrow.svg";
import "./TotalContests.css";
const TotalContests = () => {
  return (
    <div className="total-container">
      <div className="icon">
        <img src={totalContestsIcon} />
      </div>
      <div className="number">
        <p className="contest-number">75</p>
        <div className="head-p">Contest</div>
        <div>
          <img src={upperArrowIcon} />
          50% (07 days)
        </div>
      </div>
    </div>
  );
};

export default TotalContests;
