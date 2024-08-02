const express = require('express');
const { reminders, createReminder, getReminders } = require('../controllers/reminderController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', reminders)
router.post('/', authenticate, createReminder);
router.get('/', authenticate, getReminders);

module.exports = router;
