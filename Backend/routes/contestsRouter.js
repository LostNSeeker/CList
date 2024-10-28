const express = require('express');
const { getUpcomingContests, getLiveContests } = require('../controllers/contestsController');

const router = express.Router();

// Controller functions (you need to implement these)

// Route to get upcoming contests
router.get('/upcoming', getUpcomingContests);

// Route to get live contests
router.get('/live', getLiveContests);



module.exports = router;