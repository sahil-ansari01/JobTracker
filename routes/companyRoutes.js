const express = require('express');
const { createCompany, getCompanies } = require('../controllers/companyController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createCompany);
router.get('/', authenticate, getCompanies);

module.exports = router;
