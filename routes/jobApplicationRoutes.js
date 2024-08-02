const express = require('express');
const { createJobApplication, getJobApplications, jobApplications } = require('../controllers/jobApplicationController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', jobApplications)
router.post('/', authenticate, createJobApplication);
router.get('/', authenticate, getJobApplications);

module.exports = router;
