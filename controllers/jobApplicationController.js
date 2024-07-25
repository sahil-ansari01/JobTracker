const { JobApplication } = require('../models/jobApplication');

exports.createJobApplication = async (req, res) => {
  const { userId } = req.user;
  const { position, company, status, attachment } = req.body;

  try {
    const jobApplication = await JobApplication.create({ userId, position, company, status, attachment });
    res.status(201).json(jobApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobApplications = async (req, res) => {
  const { userId } = req.user;

  try {
    const jobApplications = await JobApplication.findAll({ where: { userId } });
    res.json(jobApplications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
