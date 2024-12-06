import "./currentRatings.css";
import UserContext from "../utils/userContext";
import { useContext } from "react";
import lc from "/leetcode.svg";
import cc from "/codechef-svgrepo-com.svg";
import cf from "/code-forces.svg";

const CurrentRatings = () => {
  const { totalStats, loading, error } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className=" main-box flex flex-col w-full justify-center items-center rounded-2xl m-4  pb-4 bg-white  border-2 border-gray-200 ">
      <header className="flex items-center justify-center font-bold">Current Ratings</header>
      <div className="leetcode-main">
        <div className="leetcode">
          <img src={lc} alt="" className="resource-icon" />
          <h2>Leetcode</h2>
          <p>Rating: {parseInt(totalStats.lcRating)}</p>
        </div>
        <div className="leetcode">
          <img src={cf} alt="" className="resource-icon" />
          <h2>Codeforces</h2>
          <p>Rating: {totalStats.cfRating}</p>
        </div>
        <div className="leetcode">
          <img src={cc} alt="" className="resource-icon" />
          <h2>Codechef</h2>
          <p>Rating: {totalStats.ccRating}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentRatings;
