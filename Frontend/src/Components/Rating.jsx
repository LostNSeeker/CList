import axios from 'axios';
import { useEffect, useState } from 'react';
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
      const date = new Date(entry.date);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      allEntries[monthYear] = allEntries[monthYear] || {};
      allEntries[monthYear][platformKey] = entry.rating;
    });
  };

  // Collect data for each platform
  collectData(data.cf, 'cf');
  collectData(data.cc, 'cc');
  collectData(data.lc, 'lc');

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
        borderColor: 'blue',
        tension: 0.1,
      },
      {
        label: 'CodeChef (CC)',
        data: ccData,
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
      {
        label: 'LeetCode (LC)',
        data: lcData,
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month and Year',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12, // Limit the number of ticks on the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: 'Rating',
        },
      },
    },
  };

  return <Line data={chartData} options={options} height={height} width={width} />;
};

// Main App component
const Rating = () => {
  const [data, setData] = useState({ cf: [], cc: [], lc: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/api/user/getRating');
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '60%', height: '400px', margin: 'auto', padding: "20px"  }}> {/* Set height here */}
      {(data.cf.length > 0 || data.cc.length > 0 || data.lc.length > 0) && (
        <CodingPlatformChart data={data} width={600} height={400} /> // Pass width and height as props
      )}
    </div>
  );
};

CodingPlatformChart.propTypes = {
  data: PropTypes.shape({
    cf: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      })
    ).isRequired,
    cc: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      })
    ).isRequired,
    lc: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Rating;
