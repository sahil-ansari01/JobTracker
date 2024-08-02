const express = require('express');
const { notes, createNote } = require('../controllers/noteController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', notes)
router.post('/', authenticate, createNote);

module.exports = router;
