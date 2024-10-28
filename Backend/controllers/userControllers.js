const axios = require("axios");

//get user rating from codeforces
const getCFRating = async () => {
	try {
		const cfId = "bipiniitkgp";
		//codeforces rating api call
		const response = await axios.get(
			`https://codeforces.com/api/user.rating?handle=${cfId}`
		);
		const data = response.data;
		const cfRatings = [];
		data.result.map((item) => {
			cfRatings.push({
				rating: item.newRating,
				rank: item.rank,
				date: new Date(
					item.ratingUpdateTimeSeconds * 1000
				).toLocaleDateString(),
			});
		});
		return cfRatings;
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
};

const getCCRating = async () => {
	try {
		const ccId = "ksun48";
		//codechef rating api call
		const response = await axios.get(
			`https://codechef-api.vercel.app/handle/${ccId}`
		);
		const data = response.data;
		const ccRatings = [];
		data.ratingData.map((item) => {
			ccRatings.push({
				rating: item.rating,
				rank: item.rank,
				date: new Date(
					`${item.getyear}-${item.getmonth}-${item.getday}`
				).toLocaleDateString(),
			});
		});
		return ccRatings;
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
};
const getLCRating = async () => {
	const url = "https://leetcode.com/graphql";
	const query = {
		operationName: "userContestRankingInfo",
		query: `
            query userContestRankingInfo($username: String!) {
                userContestRanking(username: $username) {
                    attendedContestsCount
                    rating
                    globalRanking
                    totalParticipants
                    topPercentage
                    badge {
                        name
                    }
                }
                userContestRankingHistory(username: $username) {
                    attended
                    trendDirection
                    problemsSolved
                    totalProblems
                    finishTimeInSeconds
                    rating
                    ranking
                    contest {
                        title
                        startTime
                    }
                }
            }
        `,
		variables: {
			username: "bipiniitkgp",
		},
	};

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(query),
		});

		if (!response.ok) {
			console.error("Failed to fetch rating history:\n", response.json());
			return;
		}

		const result = await response.json();

		// Check if data was returned
		const data = result.data.userContestRankingHistory;
		if (!data || data.length === 0) {
			console.log(`No rating history found for ${username}`);
			return;
		}
		filteredData = data.filter((contest) => contest.attended !== false);
		// Format and display rating history
		const ratingHistory = filteredData.map((contest) => ({
			date: new Date(contest.contest.startTime * 1000).toLocaleDateString(),
			rating: contest.rating,
			rank: contest.ranking,
		}));

		// console.log(ratingHistory);
		return ratingHistory;
	} catch (error) {
		console.error("Error fetching rating history:", error);
	}
};

const getUserRating = async (req, res) => {
	const allRatings = {};
	allRatings.cf = await getCFRating();
	allRatings.cc = await getCCRating();
	allRatings.lc = await getLCRating();
	res.json(allRatings);
};

module.exports = { getUserRating };
