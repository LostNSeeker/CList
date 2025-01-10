import { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserContext from "../utils/userContext";
import { Loader2 } from "lucide-react";

export function PieChartQuestions() {
  const { totalStats, loading, error } = useContext(UserContext);

  if (loading) {
    return (
      <Card className="w-full h-[250px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full h-[250px] flex items-center justify-center">
        <p className="text-red-500">Error loading data</p>
      </Card>
    );
  }

  const PLATFORM_STYLES = {
    leetcode: {
      primary: "#FFA116",
      secondary: "#FFB84D",
      name: "LeetCode",
      icon: "/leetcode.svg",
    },
    codeforces: {
      primary: "#1890FF",
      secondary: "#69C0FF",
      name: "CodeForces",
      icon: "/code-forces.svg",
    },
    codechef: {
      primary: "#4C4C4C",
      secondary: "#737373",
      name: "CodeChef",
      icon: "/codechef-svgrepo-com.svg",
    },
  };

  const chartData = [
    {
      name: PLATFORM_STYLES.leetcode.name,
      value: totalStats.lcProblems || 0,
      platform: "leetcode",
    },
    {
      name: PLATFORM_STYLES.codeforces.name,
      value: totalStats.cfProblems || 0,
      platform: "codeforces",
    },
    {
      name: PLATFORM_STYLES.codechef.name,
      value: totalStats.ccProblems || 0,
      platform: "codechef",
    },
  ].sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.[0]) {
      const data = payload[0].payload;
      const percentage = (
        (data.value / totalStats.totalProblems) *
        100
      ).toFixed(1);
      const platformStyle = PLATFORM_STYLES[data.platform];

      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg" style={{ color: platformStyle.primary }}>
              <img
                src={platformStyle.icon}
                alt={platformStyle.name}
                className="w-6 h-6 object-contain"
              />
            </span>
            <p className="font-medium text-gray-900">{data.name}</p>
          </div>
          <p className="text-sm text-gray-600">
            {data.value.toLocaleString()} problems
          </p>
          <p className="text-xs text-gray-500">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    if (!payload) return null;

    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">
              {entry.value} ({chartData[index].value.toLocaleString()})
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (index === 0) {
      return (
        <>
          {/* Center Text Group */}
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
            <tspan
              x={cx}
              y={cy - 15}
              dy="0"
              textAnchor="middle"
              fill="#374151"
              fontSize="24"
              fontWeight="bold"
            >
              {totalStats.totalProblems.toLocaleString()}
            </tspan>
            <tspan
              x={cx}
              y={cy + 15}
              dy="0"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="14"
            >
              Total
            </tspan>
          </text>
        </>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-medium">
          Problems Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.platform}
                    fill={PLATFORM_STYLES[entry.platform].primary}
                    className="transition-colors hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
