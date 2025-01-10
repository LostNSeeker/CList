import { useContext } from "react";
import UserContext from "../utils/userContext";
import { TrendingUp } from 'lucide-react';
import { cn } from "@/lib/utils";

const CurrentRatings = () => {
  const { totalStats, loading, error } = useContext(UserContext);

  const platforms = [
    {
      name: "Leetcode",
      icon: "/leetcode.svg",
      rating: parseInt(totalStats?.lcRating) || 0,
      colors: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      textColor: "text-yellow-700"
    },
    {
      name: "Codeforces",
      icon: "/code-forces.svg",
      rating: totalStats?.cfRating || 0,
      colors: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      textColor: "text-red-700"
    },
    {
      name: "Codechef",
      icon: "/codechef-svgrepo-com.svg",
      rating: totalStats?.ccRating || 0,
      colors: "from-brown-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      textColor: "text-orange-700"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin h-8 w-8 border-3 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading ratings
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Current Ratings</h2>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>

      {/* Ratings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className={cn(
              "relative group p-4 rounded-xl transition-all duration-300",
              "bg-gradient-to-br",
              platform.bgColor,
              "hover:shadow-md"
            )}
          >
            <div className="flex items-center space-x-3">
              {/* Platform Icon */}
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg",
                "bg-gradient-to-br",
                platform.colors,
                "transition-transform duration-300 group-hover:scale-110"
              )}>
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Rating Info */}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">
                  {platform.name}
                </span>
                <span className={cn(
                  "text-lg font-bold",
                  platform.textColor
                )}>
                  {platform.rating.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Decorative Element */}
            <div className={cn(
              "absolute -z-10 inset-0 rounded-xl opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300",
              "bg-gradient-to-br",
              platform.bgColor
            )} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentRatings;