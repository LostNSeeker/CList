const express = require("express");
const {
	getUserDetails,
	userLogin,
	userSignup,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/getDetails", getUserDetails);

router.post("/login", userLogin);
router.post("/signup", userSignup);

module.exports = router;
