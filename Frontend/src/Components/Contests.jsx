import { useEffect, useState } from "react";
import axios from "axios";
import "./Contests.css";
import codeforcesIcon from "/code-forces.svg";
import codechefIcon from "/codechef-svgrepo-com.svg";
import gfgIcon from "/gfg.svg";
import leetcodeIcon from "/leetcode.svg";
import atcoderIcon from "/atCoder.svg";

const Contests = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/contests/upcoming`
        );
        const data = response.data.contests;
        setUpcomingContests(data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const image = (resource) => {
    if (resource === "codeforces.com") {
      return codeforcesIcon;
    } else if (resource === "codechef.com") {
      return codechefIcon;
    } else if (resource === "atcoder.jp") {
      return atcoderIcon;
    } else if (resource === "leetcode.com") {
      return leetcodeIcon;
    } else if (resource === "geeksforgeeks.org") {
      return gfgIcon;
    } else {
      return null;
    }
  };

  // Filter contests based on the selected platform
  const filteredContests =
    selectedPlatform === "all"
      ? upcomingContests
      : upcomingContests.filter((contest) =>
          contest.resource.includes(selectedPlatform)
        );

  return (
    <div className="contests-main-box max-w-7xl w-full mx-4 sm:mx-8">
      <h2 className="main-box-heading">Upcoming Contests</h2>

      {/* Filter dropdown */}
      <div className="filter-box">
        <label htmlFor="platform-select">Filter by Platform :     </label>
        <select
          id="platform-select"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          <option value="all">All</option>
          <option value="codeforces.com">CodeForces</option>
          <option value="codechef.com">CodeChef</option>
          <option value="atcoder.jp">AtCoder</option>
          <option value="leetcode.com">LeetCode</option>
          <option value="geeksforgeeks.org">GeeksforGeeks</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ml-6 px-4 rounded  sm:w-auto mt-4"
          onClick={() => (window.location.href = "/contests")}
        >
          View All
        </button>
      </div>

      {filteredContests.length > 0 ? (
        <ul className="content-box">
          {filteredContests.map((contest) => (
            <div key={contest.id} className="list-item">
              <img
                src={image(contest.resource)}
                alt=""
                className="resource-icon"
              />
              <a href={contest.href} target="_blank" rel="noopener noreferrer">
                {contest.event.slice(0, 20)}...
              </a>
              <p>{contest.start}</p>
              {/*<input type="checkbox" />*/}
            </div>
          ))}
        </ul>
      ) : (
        <p>No upcoming contests at the moment for the selected platform.</p>
      )}
    </div>
  );
};

export default Contests;
