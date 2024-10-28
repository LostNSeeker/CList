import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
