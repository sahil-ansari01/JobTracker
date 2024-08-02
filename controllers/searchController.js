const { JobApplication } = require('../models/jobApplication');
const path = require('path')

exports.search = async(req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard', 'search.html'))
  } catch (err) {
    console.log(err);
  }
}

exports.searchJobApplications = async (req, res) => {
  const { userId } = req.user;
  const { query } = req.query;

  try {
    const jobApplications = await JobApplication.findAll({
      where: {
        userId,
        [Op.or]: [
          { position: { [Op.like]: `%${query}%` } },
          { company: { [Op.like]: `%${query}%` } },
        ],
      },
    });
    res.json(jobApplications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
