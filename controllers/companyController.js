const { Company } = require('../models/company');

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
