const { Company } = require('../models/company');
const path = require('path')

exports.companies = async(req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard', 'companies.html'))
  } catch (err) {
    console.log(err);
  }
}

exports.createCompany = async (req, res) => {
  const { userId } = req.user;
  const { name, industry } = req.body;

  try {
    const company = await Company.create({ userId, name, industry });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  const { userId } = req.user;

  try {
    const companies = await Company.findAll({ where: { userId } });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
