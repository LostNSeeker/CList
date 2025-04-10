const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

const serviceAccountPath =
	process.env.NODE_ENV == "production"
		? "/etc/secrets/admin-key.json"
		: "./admin-key.json";

const serviceAccount = require(serviceAccountPath); // Download from Firebase Console

initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
module.exports = db;
