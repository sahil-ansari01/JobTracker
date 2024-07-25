const express = require('express');
const { createJobApplication, getJobApplications } = require('../controllers/jobApplicationController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createJobApplication);
router.get('/', authenticate, getJobApplications);

module.exports = router;
