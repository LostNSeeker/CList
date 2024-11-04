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
	const [maxPage, setMaxPage] = useState(1); // Add state for maxPage
	const [isLoading, setIsLoading] = useState(false); // Add state for loading
	const questionsPerPage = 13;

	const fetchPageData = async (pageNumber) => {
		setIsLoading(true); // Set loading to true when fetching starts
		try {
			const response = await fetch(
				`http://localhost:5000/api/user/getQuestionByPage?page=${
					pageNumber - 1
				}`
			);
			const data = await response.json();
			console.log(data);
			setSolvedQuestions((prevState) => ({
				...prevState,
				codechef: data.solvedQ || [],
			}));
			setMaxPage(data.maxPage || 1); // Update maxPage from the response
			console.log(solvedQuestions);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false); // Set loading to false when fetching is complete
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true); // Set loading to true when fetching starts
			try {
				const response = await fetch(
					`http://localhost:5000/api/user/getSolvedQuestions`
				);
				const data = await response.json();
				console.log(data);
				setSolvedQuestions({
					codechef: data.CC.solvedQ,
					leetcode: data.LC,
					codeforces: data.CF,
				});
				setMaxPage(data.CC.maxPage); // Update maxPage from the response
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false); // Set loading to false when fetching is complete
			}
		};
		fetchData();
	}, []);

	const handlePageChange = (pageNumber) => {
		if (activeTab === "codechef") {
			fetchPageData(pageNumber);
		}
		setCurrentPage(pageNumber);
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);
		setCurrentPage(1); // Reset to page 1 when switching tabs
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
		const totalPages =
			activeTab === "codechef"
				? maxPage
				: Math.ceil(solvedQuestions[activeTab].length / questionsPerPage);
		const maxPageNumbersToShow = 5;
		const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

		let startPage = Math.max(1, currentPage - halfPageNumbersToShow);
		let endPage = Math.min(totalPages, currentPage + halfPageNumbersToShow);

		if (currentPage - halfPageNumbersToShow <= 0) {
			endPage = Math.min(
				totalPages,
				endPage + (halfPageNumbersToShow - currentPage + 1)
			);
		}

		if (currentPage + halfPageNumbersToShow > totalPages) {
			startPage = Math.max(
				1,
				startPage - (currentPage + halfPageNumbersToShow - totalPages)
			);
		}

		if (startPage > 1) {
			pageNumbers.push(
				<button key={1} onClick={() => handlePageChange(1)}>
					1
				</button>
			);
			if (startPage > 2) {
				pageNumbers.push(
					<span key="start-ellipsis" className="ellipsis">
						...
					</span>
				);
			}
		}

		for (let i = startPage; i <= endPage; i++) {
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

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pageNumbers.push(
					<span key="end-ellipsis" className="ellipsis">
						...
					</span>
				);
			}
			pageNumbers.push(
				<button key={totalPages} onClick={() => handlePageChange(totalPages)}>
					{totalPages}
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
					onClick={() => handleTabChange("codechef")}
				>
					CodeChef
				</button>
				<button
					className={activeTab === "leetcode" ? "active" : ""}
					onClick={() => handleTabChange("leetcode")}
				>
					LeetCode
				</button>
				<button
					className={activeTab === "codeforces" ? "active" : ""}
					onClick={() => handleTabChange("codeforces")}
				>
					Codeforces
				</button>
			</div>
			<div className="content">
				{isLoading ? (
					<p>Loading...</p>
				) : currentQuestions.length > 0 ? (
					<>
						<ul>
							{currentQuestions.map((question, index) => (
								<li key={index}>
									{question.problemName}
									<button
										onClick={() => window.open(question.problemLink, "_blank")}
									>
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
