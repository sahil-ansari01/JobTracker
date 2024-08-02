const express = require('express');
const { updateProfile, profile } = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', profile);
router.post('/:userId', updateProfile);

module.exports = router;
