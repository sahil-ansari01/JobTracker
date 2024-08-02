const express = require('express');
const { search, searchJobApplications } = require('../controllers/searchController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', search)
router.get('/', authenticate, searchJobApplications);

module.exports = router;
