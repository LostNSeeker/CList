import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import PreviousSolved from "./Pages/PreviousSolved";
import Contests from "./Components/Contests";
import Home from "./Pages/Home";
import TopNav from "./components/TopNav";
import Rating from "./components/Rating";
import Events from "./components/Events";
import { UserProvider } from "./utils/userContext";
import UserContext from "./utils/userContext";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { userDetails, loading } = useContext(UserContext);
  const isLogin = Boolean(userDetails);
  const hideNav = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (hideNav) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/events" element={<Events />} />
            <Route path="/solvedQuestions" element={<PreviousSolved />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
