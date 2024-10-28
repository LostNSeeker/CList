
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Contests from "./Components/Contests";
import Home from "./Pages/Home";
import TopNav from "./Components/TopNav";
import LeftNav from "./Components/LeftNav";
import Chart from "./Components/Chart";
import Rating from "./Components/Rating";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/signup";

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {!hideNav && (
        <div className="app-screen">
          <LeftNav />
          <div className="right-screen">
            <TopNav />
            <div className="bottom-screen">
              <Routes>
                <Route path="/contests" element={<Contests />} />
                <Route path="/home" element={<Home />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/rating" element={<Rating />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
