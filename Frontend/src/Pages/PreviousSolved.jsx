import React, { useState, useEffect } from "react";
import "./PreviousSolved.css";

const PreviousSolved = () => {
	const [activeTab, setActiveTab] = useState("codechef");
	const [solvedQuestions, setSolvedQuestions] = useState({
		codechef: [],
		leetcode: [],
		codeforces: [],
	});
	const [currentPage, setCurrentPage] = useState(1);
	const questionsPerPage = 13;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:5000/api/user/getSolvedQuestions"
				);
				const data = await response.json();
				console.log(data);
				setSolvedQuestions({
					codechef: data.CC,
					leetcode: data.LC,
					codeforces: data.CF,
				});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const indexOfLastQuestion = currentPage * questionsPerPage;
	const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
	const currentQuestions =
		solvedQuestions[activeTab].length > 0
			? solvedQuestions[activeTab].slice(
					indexOfFirstQuestion,
					indexOfLastQuestion
			  )
			: [];

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (
			let i = 1;
			i <= Math.ceil(solvedQuestions[activeTab].length / questionsPerPage);
			i++
		) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={currentPage === i ? "active" : ""}
				>
					{i}
				</button>
			);
		}
		return pageNumbers;
	};

	return (
		<div className="container">
			<div className="tabs">
				<button
					className={activeTab === "codechef" ? "active" : ""}
					onClick={() => setActiveTab("codechef")}
				>
					CodeChef
				</button>
				<button
					className={activeTab === "leetcode" ? "active" : ""}
					onClick={() => setActiveTab("leetcode")}
				>
					LeetCode
				</button>
				<button
					className={activeTab === "codeforces" ? "active" : ""}
					onClick={() => setActiveTab("codeforces")}
				>
					Codeforces
				</button>
			</div>
			<div className="content">
				{currentQuestions.length > 0 ? (
					<>
						<ul>
							{currentQuestions.map((question, index) => (
								<li key={index}>
									{question}
									<button onClick={() => window.open(question, "_blank")}>
										Visit
									</button>
								</li>
							))}
						</ul>
						<div className="pagination">{renderPageNumbers()}</div>
					</>
				) : (
					<p>No solved questions available.</p>
				)}
			</div>
		</div>
	);
};

export default PreviousSolved;
