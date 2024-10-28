const express = require("express");
const { getUserDetails } = require("../controllers/userControllers");

const router = express.Router();

router.get("/getDetails", getUserDetails);

module.exports = router;
