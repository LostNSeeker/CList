import UserContext from "../utils/userContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	TimeScale,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import "chartjs-adapter-moment"; // Required for handling time scale

// Register necessary components
ChartJS.register(
	LineElement,
	PointElement,
	LinearScale,
	TimeScale,
	Title,
	Tooltip,
	Legend
);

const CodingPlatformChart = ({ data, width, height }) => {
	console.log(data);
	const monthYearLabels = [];
	const cfData = [];
	const ccData = [];
	const lcData = [];

	// Create an object to collect ratings for each exact date
	const allEntries = {};

	const collectData = (platformData, platformKey) => {
		platformData.forEach((entry) => {
			// eslint-disable-next-line no-unused-vars
			const [day, month, year] = entry.date.split("/"); // Split the date string

			// Create the month-year string manually
			const monthYear = `${new Date(year, month - 1).toLocaleString("default", {
				month: "long",
			})} ${year}`;
			allEntries[monthYear] = allEntries[monthYear] || {};
			allEntries[monthYear][platformKey] = entry.rating;
		});
	};

	// Collect data for each platform
	collectData(data.cf.ratingHistory, "cf");
	collectData(data.cc.ratingHistory, "cc");
	collectData(data.lc.ratingHistory, "lc");

	// Prepare data for the chart
	Object.keys(allEntries).forEach((date) => {
		monthYearLabels.push(date); // Push the date object
		cfData.push(allEntries[date].cf || null); // Use null if no rating
		ccData.push(allEntries[date].cc || null);
		lcData.push(allEntries[date].lc || null);
	});

	// Create datasets for Chart.js
	const chartData = {
		labels: monthYearLabels.map((date) => new Date(date)), // Convert string labels to Date objects
		datasets: [
			{
				label: "CodeForces (CF)",
				data: cfData,
				fill: false,
				borderColor: "rgba(54, 162, 235, 0.8)",
				backgroundColor: "rgba(54, 162, 235, 1)",
				borderWidth: 2,
				pointRadius: 1,
				pointHoverRadius: 4,
				pointBackgroundColor: "rgba(54, 162, 235, 1)",
				pointBorderColor: "rgba(54, 162, 235, 0.5)",
				tension: 0.3,
				spanGaps: true,
			},
			{
				label: "CodeChef (CC)",
				data: ccData,
				fill: false,
				borderColor: "#F67000",
				backgroundColor: "#F67000",
				borderWidth: 2,
				pointRadius: 1,
				pointHoverRadius: 4,
				pointBackgroundColor: "#F67000",
				pointBorderColor: "#F67000",
				tension: 0.3,
				spanGaps: true,
			},
			{
				label: "LeetCode (LC)",
				data: lcData,
				fill: false,
				borderColor: "green",
				backgroundColor: "green",
				borderWidth: 2,
				pointRadius: 1,
				pointHoverRadius: 4,
				pointBackgroundColor: "green",
				pointBorderColor: "green",
				tension: 0.3,
				spanGaps: true,
			},
		],
	};

	// Chart options for a premium look
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			title: {
				display: true,
				text: "Analytics of Rating",
				color: "#333",
				font: { size: 20, family: "Inter", weight: "bold" },
				padding: { top: 10, bottom: 30 },
			},
			legend: {
				position: "top",
				labels: {
					usePointStyle: true, // Use point style for the legend
					pointStyle: "rect", // Set point style to a small square
					color: "#333",
					font: {
						size: 14,
						family: "Inter",
					},
				},
			},
			tooltip: {
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				titleColor: "#fff",
				bodyColor: "#fff",
				cornerRadius: 4,
				titleFont: {
					size: 14,
					family: "Inter",
				},
				bodyFont: {
					size: 12,
					family: "Inter",
				},
				padding: 10,
			},
		},
		scales: {
			x: {
				type: "time", // Set the x-axis type to time for exact date representation
				time: {
					tooltipFormat: "MMM D, YYYY", // Format for the tooltip
					displayFormats: {
						day: "MMM D, YYYY", // Display format on the x-axis
					},
					unit: "day", // Unit for the x-axis
				},
				grid: {
					display: false, // Hide gridlines for a cleaner look
				},
				title: {
					display: true,
					text: "Time",
					color: "#666",
					font: {
						size: 16,
						family: "Inter",
						weight: "bold",
					},
				},
				ticks: {
					color: "#666",
					autoSkip: true,
					maxTicksLimit: 10,
				},
			},
			y: {
				position: "right", // Moves the y-axis to the right side of the chart
				grid: {
					color: "rgba(200, 200, 200, 0.2)", // Light, subtle gridline
					borderDash: [5, 5],
				},
				title: {
					display: true,
					text: "Rating",
					color: "#666",
					font: {
						size: 16,
						family: "Inter",
						weight: "bold",
					},
				},
				ticks: {
					color: "#666",
				},
			},
		},
		animation: {
			duration: 2000, // Animation duration in ms
			easing: "easeInOutQuad", // Easing function
		},
	};

	return (
		<Line data={chartData} options={options} height={height} width={width} />
	);
};

// Main App component
const Rating = () => {
	const { userDetails, loading, error } = useContext(UserContext);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading data</p>;

	return (
		<div
			style={{ width: "97%", height: "100%", margin: "auto", padding: "30px" }}
		>
			{userDetails &&
				userDetails.cf &&
				userDetails.cc &&
				userDetails.lc &&
				(userDetails.cf.ratingHistory.length > 0 ||
					userDetails.cc.ratingHistory.length > 0 ||
					userDetails.lc.ratingHistory.length > 0) && (
					<CodingPlatformChart data={userDetails} width={600} height={400} />
				)}
		</div>
	);
};

CodingPlatformChart.propTypes = {
	data: PropTypes.shape({
		cf: PropTypes.shape({
			ratingHistory: PropTypes.arrayOf(
				PropTypes.shape({
					date: PropTypes.string.isRequired,
					rating: PropTypes.number.isRequired,
				})
			).isRequired,
		}).isRequired,
		cc: PropTypes.shape({
			ratingHistory: PropTypes.arrayOf(
				PropTypes.shape({
					date: PropTypes.string.isRequired,
					rating: PropTypes.number.isRequired,
				})
			).isRequired,
		}).isRequired,
		lc: PropTypes.shape({
			ratingHistory: PropTypes.arrayOf(
				PropTypes.shape({
					date: PropTypes.string.isRequired,
					rating: PropTypes.number.isRequired,
				})
			).isRequired,
		}).isRequired,
	}).isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
};

export default Rating;
