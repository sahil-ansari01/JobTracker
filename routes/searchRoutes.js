const express = require('express');
const { searchJobApplications } = require('../controllers/searchController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticate, searchJobApplications);

module.exports = router;
