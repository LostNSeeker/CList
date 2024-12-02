import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { auth } from "../../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
	      try {
	        setLoading(true);
					const token = await user.getIdToken();
	        const response = await axios.get(
          	"http://localhost:5000/api/user/getDetails",
						{
							headers: {
								Authorization: token,
							},
						}
	        );
	        setUserDetails(response.data);
	        console.log(response.data);
	      } catch (err) {
	        setError(err.message);
	      } finally {
	        setLoading(false);
	      }
	    } else {
    		setUserDetails(null);
				setLoading(false);
			}
		});

		return () => unsubscribe();
  }, []);

  // Function to calculate total problems solved, contests, and ratings
  const totalStats = useMemo(() => {
    if (!userDetails)
     
			return {
       
				totalProblems: 0,
       
				totalContests: 0,
       
				cfProblems: 0,
       
				ccProblems: 0,
       
				lcProblems: 0,
       
				cfContests: 0,
       
				ccContests: 0,
       
				lcContests: 0,
        cfRating: 0,
        ccRating: 0,
        lcRating: 0,
     ,
			};

    const cfProblems = userDetails.cf?.solvedProblems || 0;
    const ccProblems = userDetails.cc?.solvedProblems || 0;
    const lcProblems = userDetails.lc?.solvedProblems || 0;

    const totalProblems = cfProblems + ccProblems + lcProblems;

    const cfContests = userDetails.cf?.contests || 0;
    const ccContests = userDetails.cc?.contests || 0;
    const lcContests = userDetails.lc?.contests || 0;

    const totalContests = cfContests + ccContests + lcContests;

    // Extract current ratings
    const cfRating =
      userDetails.cf?.ratingHistory?.length > 0
        ? userDetails.cf.ratingHistory[userDetails.cf.ratingHistory.length - 1]
            .rating
        : 0;

	const ccRating =
	  userDetails.cc?.ratingHistory?.length > 0
		? userDetails.cc.ratingHistory[userDetails.cc.ratingHistory.length - 1]
			.rating
		: 0;

	const lcRating =
	  userDetails.lc?.ratingHistory?.length > 0
		? userDetails.lc.ratingHistory[userDetails.lc.ratingHistory.length - 1]
			.rating
		: 0;

    return {
     
			totalProblems,
     
			totalContests,
     
			cfProblems,
     
			ccProblems,
     
			lcProblems,
     
			cfContests,
     
			ccContests,
     
			lcContests,
      cfRating,
      ccRating,
      lcRating,
   ,
		};
  }, [userDetails]);

  return (
    <UserContext.Provider value={{ userDetails, totalStats, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
