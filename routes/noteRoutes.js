const express = require('express');
const { createNote } = require('../controllers/noteController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createNote);

module.exports = router;
