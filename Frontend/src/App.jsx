import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Contests from "./Components/Contests";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contests" element={<Contests />} />
      </Routes>
    </Router>
  );
}

export default App;
