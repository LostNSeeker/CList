import totalContestsIcon from "/totalContestsIcon.svg";
//import upperArrowIcon from "/upperArrow.svg";
import "./TotalContests.css";
import UserContext  from '../utils/userContext';
import { useContext } from 'react';



const TotalContests = () => {
  const { totalStats, loading, error } = useContext(UserContext);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div className="total-container border">
      <div className="icon">
        <img src={totalContestsIcon} />
      </div>
      <div className="number">
        <p className="contest-number">{totalStats.totalContests}</p>
        <div className="head-p">Contest</div>
        {/*<div>
          <img src={upperArrowIcon} />
          50% (07 days)
        </div>*/}
      </div>
    </div>
  );
};

export default TotalContests;
