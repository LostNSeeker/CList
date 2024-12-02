const express = require("express");
const {
	getUserDetails,
	getSolvedQuestions,
	getCCByPage,
	userSignup,
} = require("../controllers/userControllers");
const verifyUser = require("../middleware/verifyUser");

const router = express.Router();

router.get("/getDetails", verifyUser, getUserDetails);

router.get("/getSolvedQuestions", verifyUser, getSolvedQuestions);

router.get("/getQuestionByPage",verifyUser, getCCByPage);
router.post("/signup", userSignup);

module.exports = router;
