import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import PreviousSolved from "./Pages/PreviousSolved";
import Contests from "./Components/Contests";
import Home from "./Pages/Home";
import TopNav from "./Components/TopNav";
import LeftNav from "./Components/LeftNav";
import Rating from "./Components/Rating";
import Events from "./Components/Events";
import { UserProvider } from "./utils/userContext";
import { useContext, useEffect } from "react";
import UserContext from "./utils/userContext";

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
	const isLogin = userDetails ? true : false;
	const hideNav =
		location.pathname === "/login" || location.pathname === "/signup";

	useEffect(() => {
		if (!loading) {
			if (!isLogin && !hideNav) {
				window.location.href = "/login";
			}
		}
	}, [loading]);

	if (loading) {
		return <div>Loading...</div>;
	}

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
			)}
		</div>
	);
}

export default App;
