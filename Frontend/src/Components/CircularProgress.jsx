/* eslint-disable react/prop-types */

const CircularProgress = ({
  size = "100",
  progress,
  strokeWidth = "25",
  color = "#F67000",
  backgroundColor = "#F6700026",
}) => {
  // Calculate radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke offset based on the progress percentage
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />

      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="inherit"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />

      {/* Text showing progress percentage */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="16px"
        fill={color}
      >
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default CircularProgress;
