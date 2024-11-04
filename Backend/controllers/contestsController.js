const axios = require("axios");
const API_KEY = process.env.CLIST_API_KEY;
const CLIST_API_URL = process.env.CLIST_API_URL;
// Get upcoming contests
const getUpcomingContests = async (req, res) => {
	try {
		// Define the parameters for upcoming and running contests from specific hosts
		const params = {
			total_count: "true", // Get total count of contests
			resource__in:
				"atcoder.jp,codechef.com,leetcode.com,geeksforgeeks.org,codeforces.com", // Filter contests by host
			upcoming: "true", // Filter for upcoming contests
			end__gt: new Date().toISOString(), // Filter for contests still ongoing
			order_by: "start", // Order contests by start date
			format_time: "true", // Format time in response
			start_time__during: "30 day", // Filter contests starting in the next 10 days
		};

		// Fetch contests from Clist API using axios with parameters
		const response = await axios.get(CLIST_API_URL, {
			headers: { Authorization: `ApiKey ${API_KEY}` },
			params: params,
		});

		// Extract data from axios response
		const data = response.data;
		// Send the filtered contests data to the client
		res.json({
			meta: data.meta,
			contests: data.objects,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Get live contests
const getLiveContests = async (req, res) => {
	try {
		// Define the parameters to fetch only live contests (ongoing at the current time)
		const params = {
			total_count: "true", // Get total count of contests
			resource__in:
				"atcoder.jp,codechef.com,leetcode.com,geeksforgeeks.org,codeforces.com", // Filter contests by host
			start__lt: new Date().toISOString(), // Contests that have already started
			end__gt: new Date().toISOString(), // Contests that haven't ended yet
			order_by: "start", // Order contests by start time
			format_time: "true", // Format time in response
		};

		// Fetch contests from Clist API using axios with parameters
		const response = await axios.get(CLIST_API_URL, {
			headers: { Authorization: `ApiKey ${API_KEY}` },
			params: params,
		});

		const data = response.data;

		// Check if contests data exists and filter for ongoing contests
		const liveContests = data.objects.filter((contest) => {
			const now = new Date();
			const start = new Date(contest.start);
			const end = new Date(contest.end);

			return start <= now && end >= now; // Ensure contest is ongoing
		});

		// Send the filtered contests data to the client
		res.json({
			meta: {
				...data.meta,
				total_count: liveContests.length,
			},
			contests: liveContests,
		});
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	getUpcomingContests,
	getLiveContests,
};
