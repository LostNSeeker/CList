// This component is used to display the upcoming contests from various platforms like Codeforces, Codechef, Atcoder, Leetcode, GeeksforGeeks.
import { useEffect, useState } from "react";
import axios from "axios";
import "./Contests.css";
import linkIcon from "/link.svg";
import codeforcesIcon from "/code-forces.svg";
import codechefIcon from "/codechef-svgrepo-com.svg";
import gfgIcon from "/gfg.svg";
import leetcodeIcon from "/leetcode.svg";
import atcoderIcon from "/atCoder.svg";

const Contests = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchContests = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/contests/upcoming"
            );
            const data = response.data.contests;
            //console.log(data);
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
    }else if(resource === "codechef.com"){
      return codechefIcon;
    }else if(resource === "atcoder.jp"){
      return atcoderIcon;
    }else if(resource === "leetcode.com"){
      return leetcodeIcon;
    }else if(resource === "geeksforgeeks.org"){
      return gfgIcon;
    }else{
      return null;
    }
    
  }

  return (
    <div className="contests-main-box">
      <h2 className="main-box-heading">Upcoming Contests</h2>
      {upcomingContests.length > 0 ? (
        <ul className="content-box">
          {upcomingContests.map((contest) => (
            <div key={contest.id} className="list-item">
              <img src={image(contest.resource)} alt=""  className="resource-icon"/>
              <a href={contest.href}>
                {contest.event.slice(0, 20)}...
              </a>
              <p>{contest.start}</p>
              <a href={contest.href}><img src={linkIcon} alt="" /></a>
            </div>
          ))}
        </ul>
      ) : (
        <p>No upcoming contests at the moment.</p>
      )}
    </div>
  );
};

export default Contests;
