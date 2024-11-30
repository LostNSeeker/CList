import "./TopNav.css"; // Assuming you will add some styles
import profileIcon from "/profile.svg";
import problemsIcon from "/Problems.svg";
import logoImage from "/DLTxt1.png"; // Replace with your image file
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion

const TopNav = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isProblemSetMenuOpen, setIsProblemSetMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 557);
  
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
    if (problemSetRef.current && !problemSetRef.current.contains(event.target)) {
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 557);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
            <li><a href="/">Home</a></li>
          </ul>
          <ul>
            <li><a href="/contests">Contests</a></li>
          </ul>
          <ul>
            <li><a href="/events">MAANG Events</a></li>
          </ul>
          <ul>
            <li><a href="/solvedQuestions">Solved Ques.</a></li>
          </ul>
        </div>

        <div className="profile-box">
          <i className="fas fa-clipboard-list fa-2x" alt="Problem sets" onClick={toggleProblemSetMenu}></i>

          {isProblemSetMenuOpen && (
            <div className="profile-submenu" ref={problemSetRef}>
              <ul>
                <li><a href="https://cses.fi/problemset" target="_blank" rel="noopener noreferrer">CSES</a></li>
                <li><a href="https://450dsa.com/" target="_blank" rel="noopener noreferrer">Love babbar</a></li>
                <li><a href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" target="_blank" rel="noopener noreferrer">Strivers sheet</a></li>
              </ul>
            </div>
          )}
        </div>

        <div className="profile-box">
          <img src={profileIcon} alt="Profile" onClick={toggleProfileMenu} />
          {isProfileMenuOpen && (
            <div className="profile-submenu" ref={submenuRef}>
              <ul>
                <li><a href="/profile">View Profile</a></li>
                 {/* Add hidden menu items for smaller screens */}
                 {isSmallScreen && (
                  <>
                    <li><a href="/">Home</a></li>
                    <li><a href="/contests">Contests</a></li>
                    <li><a href="/events">MAANG Events</a></li>
                    <li><a href="/solvedQuestions">Solved Ques.</a></li>
                  </>
                )}
                <li><a href="/Networking">Networking</a></li>
                <li><a href="/login">Logout</a></li>

               
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
