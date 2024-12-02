import "./currentRatings.css";
import UserContext from "../utils/userContext";
import { useContext } from "react";

const CurrentRatings = () => {
	const { totalStats, loading, error } = useContext(UserContext);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	return (
		<div className=" main-box flex flex-col w-full justify-center items-center rounded-2xl m-4 pt-4 pb-4 bg-white  border-2 border-gray-200 ">
			<div className="text-center">Current Ratings</div>
			<div className="leetcode-main">
				<div className="leetcode">
					<h2>Leetcode</h2>
					<p>Rating: {parseInt(totalStats.lcRating)}</p>
				</div>
				<div className="leetcode">
					<h2>Codeforces</h2>
					<p>Rating: {totalStats.cfRating}</p>
				</div>
				<div className="leetcode">
					<h2>Codechef</h2>
					<p>Rating: {totalStats.ccRating}</p>
				</div>
			</div>
		</div>
	);
};

export default CurrentRatings;
