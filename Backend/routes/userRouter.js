const express = require("express");
const {
	getUserDetails,
	getSolvedQuestions,
	getCCByPage
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/getDetails", getUserDetails);

router.get("/getSolvedQuestions", getSolvedQuestions);

router.get("/getQuestionByPage", getCCByPage);

module.exports = router;
