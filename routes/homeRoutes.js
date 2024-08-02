const express = require('express');
const { dashboard } = require('../controllers/homeController.js');
const router = express.Router();

router.get('/', dashboard)

module.exports = router;




