const express = require('express');
const { postSignup, login, getSignup } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', postSignup);
router.get('/signup', getSignup)
router.post('/login', login);

module.exports = router;




