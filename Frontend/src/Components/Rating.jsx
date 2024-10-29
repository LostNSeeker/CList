/* eslint-disable no-unused-vars */
import UserContext from '../utils/userContext';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const CodingPlatformChart = ({ data, width, height }) => {
  const monthYearLabels = [];
  const cfData = [];
  const ccData = [];
  const lcData = [];

  // Create an object to collect ratings for each month-year
  const allEntries = {};

  const collectData = (platformData, platformKey) => {
    platformData.forEach(entry => {
      // Assume entry.date is in "M/D/YYYY"
    const [month, day, year] = entry.date.split('/'); // Split the date string

    // Create the month-year string manually
    const monthYear = `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
      allEntries[monthYear] = allEntries[monthYear] || {};
      allEntries[monthYear][platformKey] = entry.rating;
    });
  };

  // Collect data for each platform
  collectData(data.cf.ratingHistory, 'cf');
  collectData(data.cc.ratingHistory, 'cc');
  collectData(data.lc.ratingHistory, 'lc');

  // Sort month-year keys in chronological order
  const sortedMonthYears = Object.keys(allEntries).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  // Prepare data for the chart
  sortedMonthYears.forEach(monthYear => {
    monthYearLabels.push(monthYear);
    cfData.push(allEntries[monthYear].cf || null); // Use null if no rating
    ccData.push(allEntries[monthYear].cc || null);
    lcData.push(allEntries[monthYear].lc || null);
  });

  // Create datasets for Chart.js
  const chartData = {
    labels: monthYearLabels,
    datasets: [
      {
        label: 'CodeForces (CF)',
        data: cfData,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 0.8)',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointRadius: 1,
        pointHoverRadius: 4,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.3,
        spanGaps: true,  // This will connect points across null values
      },
      {
        label: 'CodeChef (CC)',
        data: ccData,
        fill: false,
        borderColor: '#F67000',
        backgroundColor: '#F67000',
        borderWidth: 2,
        pointRadius: 1,
        pointHoverRadius: 4,
        pointBackgroundColor: '#F67000',
        pointBorderColor: '#F67000',
        tension: 0.3,
        spanGaps: true,  // This will connect points across null values
      },
      {
        label: 'LeetCode (LC)',
        data: lcData,
        fill: false,
        borderColor: 'green',
        backgroundColor: 'green',
        borderWidth: 2,
        pointRadius: 1,
        pointHoverRadius: 4,
        pointBackgroundColor: 'green',
        pointBorderColor: 'green',
        tension: 0.3,
        spanGaps: true,  // This will connect points across null values
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
        text: 'Analytics of Rating', // Chart title text
        color: '#333',
        font: { size: 20, family: 'Inter', weight: 'bold' },
        padding: { top: 10, bottom: 30 },
      },
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            family: 'Inter',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 4,
        titleFont: {
          size: 14,
          family: 'Inter',
        },
        bodyFont: {
          size: 12,
          family: 'Inter',
        },
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide gridlines for a cleaner look
        },
        title: {
          display: true,
          text: 'Month and Year',
          color: '#666',
          font: {
            size: 16,
            family: 'Inter',
            weight: 'bold',
          },
        },
        ticks: {
          color: '#666',
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        position: 'right', // Moves the y-axis to the right side of the chart
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Light, subtle gridline
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: 'Rating',
          color: '#666',
          font: {
            size: 16,
            family: 'Inter',
            weight: 'bold',
          },
        },
        ticks: {
          color: '#666',
        },
      },
    },
    animation: {
      duration: 2000, // Animation duration in ms
      easing: 'easeInOutQuad', // Smooth easing function
    },
  };

  return <Line data={chartData} options={options} height={height} width={width} />;
};

// Main App component
const Rating = () => {
  const { userDetails, loading, error } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div style={{ width: '97%', height: '100%', margin: 'auto', padding: '30px'}}>
      {userDetails && userDetails.cf && userDetails.cc && userDetails.lc && (
        (userDetails.cf.ratingHistory.length > 0 ||
          userDetails.cc.ratingHistory.length > 0 ||
          userDetails.lc.ratingHistory.length > 0) && (
          <CodingPlatformChart data={userDetails} width={600} height={400} />
        )
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
