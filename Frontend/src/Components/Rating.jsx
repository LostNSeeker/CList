//vdh
import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Award,
  CalendarDays,
  Calendar,
  CalendarRange,
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import UserContext from "../utils/userContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

const platformConfig = {
  codeforces: {
    color: "#2563eb",
    hoverColor: "#1d4ed8",
    name: "CodeForces",
    gradient: "from-blue-500/20 to-blue-600/20",
    borderGradient: "from-blue-500 to-blue-600",
  },
  codechef: {
    color: "#ea580c",
    hoverColor: "#c2410c",
    name: "CodeChef",
    gradient: "from-orange-500/20 to-orange-600/20",
    borderGradient: "from-orange-500 to-orange-600",
  },
  leetcode: {
    color: "#059669",
    hoverColor: "#047857",
    name: "LeetCode",
    gradient: "from-emerald-500/20 to-emerald-600/20",
    borderGradient: "from-emerald-500 to-emerald-600",
  },
};

const TimeRangeButton = ({ active, children, onClick }) => (
  <Button
    variant={active ? "default" : "outline"}
    size="sm"
    onClick={onClick}
    className={`
		px-4 py-2 transition-all duration-200
		${active ? "shadow-md scale-105" : "hover:scale-105"}
	  `}
  >
    {children}
  </Button>
);

const StatCard = ({ platform, stat, focused, onFocus }) => (
  <div
    className={`
		group relative overflow-hidden transition-all duration-300
		hover:shadow-lg cursor-pointer rounded-lg bg-white
		${focused ? "ring-2 ring-primary shadow-lg scale-105" : "hover:scale-102"}
	  `}
    onClick={onFocus}
  >
    {/* Gradient Overlay */}
    <div
      className={`
		  absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
		  bg-gradient-to-br ${platformConfig[platform].gradient}
		`}
    />

    {/* Border Gradient */}
    <div
      className={`
		  absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r
		  ${platformConfig[platform].borderGradient}
		`}
    />

    {/* Content Section */}
    <div className="p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        {/* Platform Icon and Name */}
        <div className="flex items-center gap-2">
          <div
            className={`
				p-1 rounded-md bg-gradient-to-br ${platformConfig[platform].gradient}
			  `}
          >
            <Award
              className={`h-4 w-4 text-${platformConfig[platform].color}`}
            />
          </div>
          <span className="font-medium text-sm">
            {platformConfig[platform].name}
          </span>
        </div>

        {/* Stat Change Badge */}
        <div>
          <span
            className={`
				text-xs px-2 py-1 rounded-full
				${stat.change >= 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
			  `}
          >
            {stat.change >= 0 ? (
              <TrendingUp className="inline h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="inline h-3 w-3 mr-1" />
            )}
            {Math.abs(stat.change)}
          </span>
        </div>
      </div>

      {/* Stat Details */}
      <div className="flex justify-between items-center">
        {/* Current Rating */}
        <div>
          <div className="text-xl font-bold">{stat.current}</div>
          <p className="text-xs text-gray-500">Current Rating</p>
        </div>

        {/* Highest and Lowest Ratings */}
        <div className="flex gap-6 text-xs">
          <div className="text-center">
            <div className="font-medium">{stat.highest}</div>
            <p className="text-gray-500">Highest</p>
          </div>
          <div className="text-center">
            <div className="font-medium">{stat.lowest}</div>
            <p className="text-gray-500">Lowest</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RatingChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState("all");
  const [focusedPlatform, setFocusedPlatform] = useState(null);

  // Process and format the data
  const processRatingData = () => {
    const allDates = new Set();
    const dateRatings = {};

    const collectData = (platform, ratings) => {
      if (!ratings) return;
      ratings.forEach((entry) => {
        const date = new Date(entry.date.split("/").reverse().join("-"));
        const dateStr = date.toISOString().split("T")[0];
        allDates.add(dateStr);
        dateRatings[dateStr] = {
          ...dateRatings[dateStr],
          [platform]: entry.rating,
          date: dateStr,
        };
      });
    };

    collectData("codeforces", data.cf?.ratingHistory);
    collectData("codechef", data.cc?.ratingHistory);
    collectData("leetcode", data.lc?.ratingHistory);

    const sortedData = Array.from(allDates)
      .sort()
      .map((date) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        codeforces: dateRatings[date]?.codeforces,
        codechef: dateRatings[date]?.codechef,
        leetcode: dateRatings[date]?.leetcode,
      }));

    // Filter based on time range
    if (timeRange !== "all") {
      const cutoffDate = new Date();
      if (timeRange === "6m") cutoffDate.setMonth(cutoffDate.getMonth() - 6);
      if (timeRange === "3m") cutoffDate.setMonth(cutoffDate.getMonth() - 3);
      if (timeRange === "1m") cutoffDate.setMonth(cutoffDate.getMonth() - 1);

      return sortedData.filter((item) => new Date(item.date) >= cutoffDate);
    }

    return sortedData;
  };

  const chartData = processRatingData();

  // Calculate stats for each platform
  const calculateStats = (platform) => {
    const ratings = chartData
      .map((d) => d[platform])
      .filter((r) => r !== undefined && r !== null);
    if (ratings.length === 0) return null;

    return {
      current: ratings[ratings.length - 1],
      highest: Math.max(...ratings),
      lowest: Math.min(...ratings),
      change: ratings[ratings.length - 1] - ratings[0],
    };
  };

  const stats = {
    codeforces: calculateStats("codeforces"),
    codechef: calculateStats("codechef"),
    leetcode: calculateStats("leetcode"),
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-4 shadow-xl">
          <div className="mb-3 font-semibold border-b pb-2">{label}</div>
          <div className="space-y-2">
            {payload.map(
              (entry, index) =>
                entry.value && (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {platformConfig[entry.name]?.name}
                      </span>
                      <span
                        className="text-lg font-bold"
                        style={{ color: entry.color }}
                      >
                        {entry.value}
                      </span>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 w-full sm:w-auto">
          {[
            { value: "all", label: "All Time", icon: CalendarDays },
            { value: "6m", label: "6 Months", icon: Calendar },
            { value: "3m", label: "3 Months", icon: CalendarRange },
            { value: "1m", label: "1 Month", icon: CalendarDays },
          ].map((range) => (
            <TimeRangeButton
              key={range.value}
              active={timeRange === range.value}
              onClick={() => setTimeRange(range.value)}
              className="w-full sm:w-auto"
            >
              <div className="flex items-center justify-center gap-2">
                <range.icon className="h-4 w-4" />
                <span className="whitespace-nowrap">{range.label}</span>
              </div>
            </TimeRangeButton>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stats).map(
          ([platform, stat]) =>
            stat && (
              <StatCard
                key={platform}
                platform={platform}
                stat={stat}
                focused={focusedPlatform === platform}
                onFocus={() =>
                  setFocusedPlatform(
                    focusedPlatform === platform ? null : platform
                  )
                }
              />
            )
        )}
      </div>

      <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                {Object.entries(platformConfig).map(([platform, config]) => (
                  <linearGradient
                    key={platform}
                    id={`gradient-${platform}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={config.color}
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor={config.color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                opacity={0.2}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                className="text-sm text-muted-foreground"
              />
              <YAxis
                className="text-sm text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                onClick={(e) =>
                  setFocusedPlatform(
                    focusedPlatform === e.dataKey ? null : e.dataKey
                  )
                }
              />
              {Object.entries(platformConfig).map(([platform, config]) => (
                <React.Fragment key={platform}>
                  <Area
                    type="monotone"
                    dataKey={platform}
                    stroke="none"
                    fill={`url(#gradient-${platform})`}
                    opacity={
                      focusedPlatform === null || focusedPlatform === platform
                        ? 0.3
                        : 0.1
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey={platform}
                    stroke={config.color}
                    strokeWidth={
                      focusedPlatform === null || focusedPlatform === platform
                        ? 3
                        : 1
                    }
                    opacity={
                      focusedPlatform === null || focusedPlatform === platform
                        ? 1
                        : 0.3
                    }
                    dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                    activeDot={{
                      r: 6,
                      strokeWidth: 2,
                      fill: "white",
                      stroke: config.color,
                    }}
                    connectNulls
                  />
                </React.Fragment>
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

const Rating = () => {
  const { userDetails, loading, error } = useContext(UserContext);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center min-h-[600px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center min-h-[600px]">
          <p className="text-destructive font-medium">
            Failed to load rating data
          </p>
          <p className="text-muted-foreground mt-2">Please try again later</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Rating Analytics
        </h2>
        <p className="text-sm text-gray-600">
          Track your performance across different coding platforms
        </p>
      </div>

      {/* Content Section */}
      <div>{userDetails && <RatingChart data={userDetails} />}</div>
    </div>
  );
};

export default Rating;
