import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

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
				const response = await axios.get(
					`${import.meta.env.VITE_APP_BACKEND_URL}/api/user/getDetails`
				);
				setUserDetails(response.data);
				console.log(response.data);
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
		if (!userDetails) return { totalProblems: 0, totalContests: 0, cfProblems: 0, ccProblems: 0, lcProblems: 0, cfContests: 0, ccContests: 0, lcContests: 0 };
		const cfProblems = userDetails.cf?.solvedProblems || 0;
		const ccProblems = userDetails.cc?.solvedProblems || 0;
		const lcProblems = userDetails.lc?.solvedProblems || 0;

		const totalProblems = cfProblems + ccProblems + lcProblems;

		const cfContests = userDetails.cf?.contests || 0;
		const ccContests = userDetails.cc?.contests || 0;
		const lcContests = userDetails.lc?.contests || 0;

		const totalContests = cfContests + ccContests + lcContests;

		return { totalProblems, totalContests, cfProblems, ccProblems, lcProblems, cfContests, ccContests, lcContests };
	}, [userDetails]);

	return (
		<UserContext.Provider value={{ userDetails, totalStats, loading, error }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
