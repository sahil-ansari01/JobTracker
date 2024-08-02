const express = require('express');
const { postSignup, login, getSignup, getLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', postSignup);
router.get('/signup', getSignup)
router.get('/login', getLogin)
router.post('/login', login);

module.exports = router;




