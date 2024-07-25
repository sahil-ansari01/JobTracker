const { Profile } = require('../models/profile');

exports.updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { firstName, lastName, careerGoals } = req.body;

  try {
    const profile = await Profile.findOne({ where: { userId } });
    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.careerGoals = careerGoals;
      await profile.save();
    } else {
      await Profile.create({ userId, firstName, lastName, careerGoals });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
