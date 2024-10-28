import { createContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/user/getDetails');
        setUserDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Function to calculate total problems solved and total contests
  const totalStats = useMemo(() => {
    if (!userDetails) return { totalProblems: 0, totalContests: 0 };
    const totalProblems = 
      (userDetails.cf?.solvedProblems || 0) + 
      (userDetails.cc?.solvedProblems || 0) + 
      (userDetails.lc?.solvedProblems || 0);

    const totalContests = 
      (userDetails.cf?.contests || 0) + 
      (userDetails.cc?.contests || 0) + 
      (userDetails.lc?.contests || 0);
      
    return { totalProblems, totalContests };
  }, [userDetails]);

  return (
    <UserContext.Provider value={{ userDetails, totalStats, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
