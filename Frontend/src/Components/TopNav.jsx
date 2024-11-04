import "./TopNav.css"; // Assuming you will add some styles
import profileIcon from "/profile.svg";
import { useState, useRef, useEffect } from "react";
import  "/DLTxt1.png";
import { motion } from "framer-motion"; // Import motion

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
          <img src="/DLTxt1.png" alt="logo"/>
      </div>
      <div className="right-side">
        {/*<div className="top-menu">
          <ul>
            <a href="/">
              <img src={homeIcon} />
            </a>
          </ul>
          <ul>
            <a href="/contests">
              <img src={contestsIcon} />
            </a>
          </ul>
          <ul>
            <a href="/rating">
              <img src={progressIcon} />
            </a>
          </ul>
          <ul>
            <a href="/events">
              <img src={eventsIcon} />
            </a>
          </ul>
        </div>*/}

        <div className="quote">
        <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            “Brute force: a coder’s last resort.”
          </motion.p>
        </div>

        <div className="profile-box">
          
            <img src={""} alt="Problem sets"  onClick={toggleProblemSetMenu}/>
         
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
          
            <img src={profileIcon} alt="Profile"  onClick={toggleProfileMenu}/>
         
          {isProfileMenuOpen && (
            <div className="profile-submenu" ref={submenuRef}>
              <ul>
                <li><a href="/profile">View Profile</a></li>
                <li><a href="/">Home</a></li>
                <li><a href="/contests">Contests</a></li>
                <li><a href="/events">MAANG Events</a></li>
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
