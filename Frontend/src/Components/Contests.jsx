import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contests.css";

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

  return (
    <div>
      <h2>Upcoming Contests</h2>
      {upcomingContests.length > 0 ? (
        <ul>
          {upcomingContests.map((contest) => (
            <div key={contest.id} className="list-item">
              <a href={contest.href}>{contest.event}</a>
              <p>{contest.start}</p>
              <p>{contest.end}</p>
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
