const express = require("express");
const {
	getUserDetails,
	getSolvedQuestions,
	getCCByPage,
	userLogin,
	userSignup,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/getDetails", getUserDetails);

router.get("/getSolvedQuestions", getSolvedQuestions);

router.get("/getQuestionByPage", getCCByPage);
router.post("/login", userLogin);
router.post("/signup", userSignup);

module.exports = router;
