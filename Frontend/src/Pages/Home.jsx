import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import Contests from "../Components/Contests";
import { PieChartQuestions } from "../components/pieChartQuestions";
import { PieChartContests } from "../components/pieChartContests";
import CurrentRatings from "../components/currentRattings";
import Events from "../components/Events";
import ProblemSolved from "../components/ProblemSolved";
import TotalContests from "../components/TotalContests";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center ">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {auth.currentUser?.displayName || "Coder"}!
          </h1>
          <p className="text-sm text-gray-600 mt-2 sm:mt-0">
            Let's track your progress
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {/* Stats and Ratings Section */}
            <div className="space-y-6">
              {/* Quick Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProblemSolved />

                <TotalContests />
              </div>

              {/* Ratings Card */}
              <div>
                <CurrentRatings />
              </div>
            </div>

            {/* Charts and Events Section */}
            <div className="space-y-6">
              {/* Pie Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm ">
                  <PieChartQuestions />
                </div>
                <div className="bg-white rounded-xl shadow-sm ">
                  <PieChartContests />
                </div>
              </div>

              {/* Events Section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden py-4 px-4">
                <Events />
              </div>
            </div>
          </div>

          {/* Right Section - Contests */}
          <div className="xl:w-1/3 flex-none h-full sticky top-0 overflow-y-auto bg-white rounded-xl shadow-sm p-6">
            <Contests />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
