const express = require('express');
const { createReminder, getReminders } = require('../controllers/reminderController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createReminder);
router.get('/', authenticate, getReminders);

module.exports = router;
