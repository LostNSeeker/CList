
import upperArrowIcon from "/upperArrow.svg";
import totalProblemIcon from "/totalProblem.svg";
import "./TotalContests.css";
import UserContext  from '../utils/userContext';
import { useContext } from 'react';

const ProblemSolved = () => {
  const { totalStats, loading, error } = useContext(UserContext);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    return (
        <div className="total-container">
            <div className="icon">
        <img src={totalProblemIcon} />
      </div>
      <div className="number">
        <p className="contest-number">{totalStats.totalProblems}</p>
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