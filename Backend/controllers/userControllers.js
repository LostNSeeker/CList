const axios = require("axios");

const cheerio = require("cheerio");

//object mappings
//create rating vs title in codeforces
const getRatingTitleCF = (rating) => {
	if (rating < 1200) return "Newbie";
	if (rating < 1400) return "Pupil";
	if (rating < 1600) return "Specialist";
	if (rating < 1900) return "Expert";
	if (rating < 2100) return "Candidate Master";
	if (rating < 2300) return "Master";
	if (rating < 2400) return "International Master";
	if (rating < 2600) return "Grandmaster";
	if (rating < 3000) return "International Grandmaster";
	return "Legendary Grandmaster";
};

//helper functions

async function getTotalSolvedCF(handle) {
	const url = `https://codeforces.com/api/user.status?handle=${handle}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data.status === "OK") {
			console.log(data.result);
			const solvedProblems = new Set();

			data.result.forEach((submission) => {
				if (submission.verdict === "OK") {
					const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
					solvedProblems.add(problemId);
				}
			});

			return solvedProblems.size;
		} else {
			console.error("Error:", data.comment);
			return null;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}

const getCFRating = async (cfId) => {
	const details = {};
	const totalSolved = await getTotalSolvedCF(cfId);
	details.solvedProblems = totalSolved;

	try {
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
		details.ratingHistory = cfRatings;
		details.contests = cfRatings.length;
		details.title = getRatingTitleCF(cfRatings[cfRatings.length - 1].rating);
		return details;
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
};

const getCCRating = async (ccId) => {
	const details = {};
	try {
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
		const gotData = await getCCDetails(ccId);
		details.solvedProblems = gotData.solvedCount;
		details.contests = gotData.contests;
		details.stars = gotData.stars;
		details.ratingHistory = ccRatings;

		return details;
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
};

const getLCRating = async (lcId) => {
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
			username: lcId,
		},
	};

	const details = {};

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
		details.badge = result.data.userContestRanking.badge?.name || "None";
		details.contests = filteredData.length;
		details.ratingHistory = ratingHistory;
	} catch (error) {
		console.error("Error fetching rating history:", error);
	}

	const query2 = {
		operationName: "userSessionProgress",
		query: `
            query userSessionProgress($username: String!) {
                allQuestionsCount {
                    difficulty
                    count
                }
                matchedUser(username: $username) {
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                        totalSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                    }
                }
            }
        `,
		variables: {
			username: lcId,
		},
	};

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(query2),
		});

		if (!response.ok) {
			console.error("Failed to fetch rating history:\n", response.json());
			return;
		}

		const result = await response.json();

		// Check if data was returned
		const data = result.data.matchedUser.submitStats;
		if (!data || data.length === 0) {
			console.log(`No rating history found for ${username}`);
			return;
		}

		const solvedProblems = data.acSubmissionNum;

		details.solvedProblems = solvedProblems[0].count;
	} catch (error) {
		console.error("Error fetching rating history:", error);
	}

	return details;
};

async function getCCDetails(username) {
	const url = `https://www.codechef.com/users/${username}`;

	try {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);

		// Use the provided selector for total solved questions
		const solvedCountText = $(
			"body > main > div > div > div > div > div > section.rating-data-section.problems-solved > h3:nth-child(71)"
		)
			.text()
			.trim();

		const contestsText = $(
			"body > main > div > div > div > div > div > section.rating-data-section.problems-solved > h3:nth-child(5)"
		)
			.text()
			.trim();

		const starRating = $(
			"body > main > div > div > div > div > div > section.user-details > ul > li:nth-child(1) > span > span.rating"
		)
			.text()
			.trim();

		const solvedCount = parseInt(solvedCountText.match(/\d+/)[0], 10);
		const contests = parseInt(contestsText.match(/\d+/)[0], 10);
		const stars = parseInt(starRating.match(/\d+/)[0], 10);

		return { solvedCount, contests, stars };
	} catch (error) {
		console.error("Error fetching solved problems count:", error);
	}
}

//controllers functions

const getUserDetails = async (req, res) => {
	//it will return the rating of the user in all the platforms
	const allRatings = {};
	allRatings.cf = await getCFRating("bipiniitkgp");
	allRatings.cc = await getCCRating("ksun48");
	allRatings.lc = await getLCRating("bipiniitkgp");
	res.json(allRatings);
};

const userLogin = async (req, res) => {
	res.send("User login");
};

const userSignup = async (req, res) => {
	const { email, password, codeforces, leetcode, codechef } = req.body;
	console.log(email, password, codeforces, leetcode, codechef);
	res.send("User signup");
};

module.exports = { getUserDetails, userLogin, userSignup };
