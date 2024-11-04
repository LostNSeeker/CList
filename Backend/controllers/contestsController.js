const axios = require("axios");
const NodeCache = require("node-cache");
const API_KEY = process.env.CLIST_API_KEY;
const CLIST_API_URL = process.env.CLIST_API_URL;

// Create a cache instance with a TTL of 15 minutes (900 seconds)
const cache = new NodeCache({ stdTTL: 900 });

// Get upcoming contests
const getUpcomingContests = async (req, res) => {
	try {
		const cacheKey = "upcomingContests";
		const cachedData = cache.get(cacheKey);

		if (cachedData) {
			return res.json(cachedData);
		}

		const params = {
			total_count: "true",
			resource__in:
				"atcoder.jp,codechef.com,leetcode.com,geeksforgeeks.org,codeforces.com",
			upcoming: "true",
			end__gt: new Date().toISOString(),
			order_by: "start",
			format_time: "true",
			start_time__during: "30 day",
		};

		const response = await axios.get(CLIST_API_URL, {
			headers: { Authorization: `ApiKey ${API_KEY}` },
			params: params,
		});

		const data = response.data;
		const responseData = {
			meta: data.meta,
			contests: data.objects,
		};

		cache.set(cacheKey, responseData);

		res.json(responseData);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Get live contests
const getLiveContests = async (req, res) => {
	try {
		const cacheKey = "liveContests";
		const cachedData = cache.get(cacheKey);

		if (cachedData) {
			return res.json(cachedData);
		}

		const params = {
			total_count: "true",
			resource__in:
				"atcoder.jp,codechef.com,leetcode.com,geeksforgeeks.org,codeforces.com",
			start__lt: new Date().toISOString(),
			end__gt: new Date().toISOString(),
			order_by: "start",
			format_time: "true",
		};

		const response = await axios.get(CLIST_API_URL, {
			headers: { Authorization: `ApiKey ${API_KEY}` },
			params: params,
		});

		const data = response.data;

		const liveContests = data.objects.filter((contest) => {
			const now = new Date();
			const start = new Date(contest.start);
			const end = new Date(contest.end);

			return start <= now && end >= now;
		});

		const responseData = {
			meta: {
				...data.meta,
				total_count: liveContests.length,
			},
			contests: liveContests,
		};

		cache.set(cacheKey, responseData);

		res.json(responseData);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	getUpcomingContests,
	getLiveContests,
};
