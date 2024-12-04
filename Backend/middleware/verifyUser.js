const { getAuth } = require("firebase-admin/auth");
const db = require("../config/firebaseAdmin"); // Firestore DB setup

const verifyUser = async (req, res, next) => {
	const idToken = req.headers.authorization;

	if (!idToken) {
		return res.status(401).send("Unauthorized");
	}

	try {
		const decodedToken = await getAuth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const userRef = db.collection("users").doc(uid);
        const user = await userRef.get();

        if (!user.exists) {
            return res.status(401).send("Unauthorized");
        }

        req.user = user.data();
		console.log("user:", req.user);
        next();
	} catch (error) {
		return res.status(401).send("Unauthorized");
	}
};

module.exports = verifyUser;
