const express = require("express");
const { getUserRating } = require("../controllers/userControllers");

const router = express.Router();

router.get("/getRating", getUserRating);

module.exports = router;
