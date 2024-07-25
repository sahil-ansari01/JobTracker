const bcrypt = require('bcryptjs');
const path = require('path')
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

exports.getSignup = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'))
  } catch (err) {
    console.log(err);
  }
}

exports.postSignup = async (req, res) => {
  const { email, password, name } = req.body;
  console.log('Email: ', email);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
