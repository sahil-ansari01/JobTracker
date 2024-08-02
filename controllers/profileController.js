const Profile = require('../models/profile');
const path = require('path');
const User = require('../models/user');

exports.profile = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard', 'profile.html'));
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, email, careerGoals } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      if (name && name.trim() !== '') {
        user.name = name;
      }
      if (email && email.trim() !== '') {
        user.email = email;
      }
      await user.save();

      const [profile, created] = await Profile.findOrCreate({
        where: { userId: userId },
        defaults: { careerGoals }
      });

      if (!created) {
        if (careerGoals && careerGoals.trim() !== '') {
          profile.careerGoals = careerGoals;
          await profile.save();
        }
      }

      res.json({ success: true, profile });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
