const express = require("express");
const {
	getUserDetails,
	getSolvedQuestions,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/getDetails", getUserDetails);

router.get("/getSolvedQuestions", getSolvedQuestions);

module.exports = router;
