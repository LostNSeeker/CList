import "./TopNav.css"; // Assuming you will add some styles
import profileIcon from "/profile.svg";
import logoImage from "/DLTxt1.png"; // Replace with your image file
import { useState, useRef, useEffect } from "react";
import { Link, redirect } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

const TopNav = () => {
	const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
	const [isProblemSetMenuOpen, setIsProblemSetMenuOpen] = useState(false);

	const submenuRef = useRef(null); // Create a ref for the submenu
	const problemSetRef = useRef(null);

	const toggleProfileMenu = () => {
		setProfileMenuOpen(!isProfileMenuOpen);
	};
	const toggleProblemSetMenu = () => {
		setIsProblemSetMenuOpen(!isProblemSetMenuOpen);
	};

	const handleClickOutside = (event) => {
		// Check if the click is outside the submenu
		if (submenuRef.current && !submenuRef.current.contains(event.target)) {
			setProfileMenuOpen(false); // Hide the menu
		}
		if (
			problemSetRef.current &&
			!problemSetRef.current.contains(event.target)
		) {
			setIsProblemSetMenuOpen(false); // Hide the menu
		}
	};

	useEffect(() => {
		// Add event listener for clicks outside the submenu
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Cleanup the event listener on component unmount
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<nav className="top-nav">
			<div className="space">
				<img src={logoImage} alt="logo" />
			</div>
			<div className="right-side">
				<div className="top-menu">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
					</ul>
					<ul>
						<li>
							<Link to="/contests">Contests</Link>
						</li>
					</ul>
					<ul>
						<li>
							<Link to="/events">MAANG Events</Link>
						</li>
					</ul>
					<ul>
						<li>
							<Link to="/solvedQuestions">Solved Ques.</Link>
						</li>
					</ul>
					<ul>
						<li>
							<Link to="/rating">Analytics</Link>
						</li>
					</ul>
				</div>

				<div className="profile-box">
					<i
						className="fas fa-clipboard-list fa-2x"
						alt="Problem sets"
						onClick={toggleProblemSetMenu}
					></i>

					{isProblemSetMenuOpen && (
						<div className="profile-submenu" ref={problemSetRef}>
							<ul>
								<li>
									<a
										href="https://cses.fi/problemset"
										target="_blank"
										rel="noopener noreferrer"
									>
										CSES
									</a>
								</li>
								<li>
									<a
										href="https://450dsa.com/"
										target="_blank"
										rel="noopener noreferrer"
									>
										Love babbar
									</a>
								</li>
								<li>
									<a
										href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
										target="_blank"
										rel="noopener noreferrer"
									>
										Strivers sheet
									</a>
								</li>
							</ul>
						</div>
					)}
				</div>

				<div className="profile-box">
					<img src={profileIcon} alt="Profile" onClick={toggleProfileMenu} />
					{isProfileMenuOpen && (
						<div className="profile-submenu" ref={submenuRef}>
							<ul>
								{/* Add hidden menu items for smaller screens */}
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/contests">Contests</Link>
								</li>
								<li>
									<Link to="/rating">Ratings</Link>
								</li>
								<li>
									<Link to="/events">MAANG Events</Link>
								</li>
								<li>
									<Link to="/solvedQuestions">Solved Ques.</Link>
								</li>
								<li>
									<Link
										onClick={() => {
											window.location.href = "/login";
											signOut(auth);
										}}
									>
										Logout
									</Link>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default TopNav;
