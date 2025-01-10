import { useContext } from 'react';
import { Trophy } from 'lucide-react';
import UserContext from '../utils/userContext';
import { cn } from "@/lib/utils";

const TotalContests = () => {
  const { totalStats, loading, error } = useContext(UserContext);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading stats
      </div>
    );
  }
  
  return (
    <div className="relative group">
      <div className={cn(
        "flex items-start gap-4 p-4 rounded-xl transition-all duration-300",
        "bg-gradient-to-br from-blue-50 to-indigo-50",
        "hover:shadow-md hover:from-blue-100 hover:to-indigo-100"
      )}>
        {/* Icon Container */}
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl",
          "bg-gradient-to-br from-blue-500 to-indigo-600",
          "transition-transform duration-300 group-hover:scale-110"
        )}>
          <Trophy className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <span className={cn(
            "text-2xl font-bold text-gray-800",
            "transition-all duration-300 group-hover:text-gray-900"
          )}>
            {totalStats.totalContests.toLocaleString()}
          </span>
          <span className={cn(
            "text-sm text-gray-500",
            "transition-all duration-300 group-hover:text-gray-600"
          )}>
            Total Contests
          </span>
        </div>

        {/* Decorative Element */}
        <div className={cn(
          "absolute -z-10 inset-0 rounded-xl opacity-0 group-hover:opacity-100",
          "bg-gradient-to-br from-blue-100/50 to-indigo-100/50",
          "transition-opacity duration-300"
        )} />
      </div>
    </div>
  );
};

export default TotalContests;