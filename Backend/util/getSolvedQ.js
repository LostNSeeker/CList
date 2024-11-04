const axios = require("axios");

const cheerio = require("cheerio");

const scrapeUserSolvedQuestions = async (username, page) => {
	const url = `https://www.codechef.com/recent/user?page=${page}&user_handle=${username}`;

	try {
		const { data } = await axios.get(url);
		const maxPage = data.max_page;
		const $ = cheerio.load(data.content);
		const solvedQ = $("tbody")
			.find("tr")
			.map((_, el) => {
				const problemLink =
					"https://www.codechef.com" +
					$(el).find("td").eq(1).find("a").attr("href");
				const problemName = $(el).find("td").eq(1).text().trim();
				if (problemLink && problemName) {
					return { problemLink, problemName };
				}
			})
			.get()
			.filter(Boolean); // Remove undefined values

		return { solvedQ, maxPage };
	} catch (error) {
		console.error("Error fetching solved problems count:", error);
		return null;
	}
};

// Example usage

// Call the function

async function getSolvedCF(handle) {
	const url = `https://codeforces.com/api/user.status?handle=${handle}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data.status === "OK") {
			const solvedProblems = [];

			data.result.forEach((submission) => {
				if (submission.verdict === "OK") {
					const problemLink = `https://codeforces.com/problemset/problem/${submission.problem.contestId}/${submission.problem.index}`;
					solvedProblems.push({
						problemLink,
						problemName: submission.problem.name,
					});
				}
			});
			return solvedProblems;
		} else {
			console.error("Error:", data.comment);
			return null;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}

async function getSolvedLC(handle) {
	const url = "https://leetcode.com/graphql";
	const query = {
		operationName: "recentAcSubmissions",
		query: `
			query recentAcSubmissions($username: String!, $limit: Int!) {
				recentAcSubmissionList(username: $username, limit: $limit) {
					titleSlug,
					title
				}
			}
		`,
		variables: {
			username: handle,
			limit: 30,
		},
	};

	try {
		const response = await axios.post(url, query, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = response.data;

		if (data.errors) {
			console.error("Error:", data.errors);
			return null;
		}

		const solvedProblems = data.data.recentAcSubmissionList.map(
			(submission) => {
				const problemLink = `https://leetcode.com/problems/${submission.titleSlug}`;
				return {
					problemLink,
					problemName: submission.title,
				};
			}
		);

		return solvedProblems;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}

async function getSolvedCC(ccId, page) {
	const solvedQ = await scrapeUserSolvedQuestions(ccId, page).catch(
		console.error
	);
	return solvedQ;
}
module.exports = { getSolvedCF, getSolvedLC, getSolvedCC };
