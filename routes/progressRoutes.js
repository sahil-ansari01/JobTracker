const express = require('express');
const { progress } = require('../controllers/progressController');
const router = express.Router();

router.get('/', progress)

module.exports = router;




