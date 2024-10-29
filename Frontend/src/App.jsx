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
import Rating from "./Components/Rating";
import { UserProvider } from "./utils/userContext";

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
  const hideNav = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
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
                <Route path="/" element={<Home />} />
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
