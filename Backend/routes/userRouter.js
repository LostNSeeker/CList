const express = require("express");
const {
	getUserRating,
	getUserDashboard,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/getRating", getUserRating);

router.get("/getDashboard", getUserDashboard);

module.exports = router;
