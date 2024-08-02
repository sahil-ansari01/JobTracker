const bcrypt = require('bcryptjs');
const path = require('path')
const jwt = require('jsonwebtoken');
const User  = require('../models/user');
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
  try {
    console.log('Email: ', email, 'Name: ', name);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    console.log("User: ", user);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error during signup:', error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function generateAccessToken(id,name) {
  return jwt.sign({userId : id , name: name}, process.env.SECRET_KEY)
}

exports.getLogin = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'))
  } catch (err) {
    console.log(err);
  }
}

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

exports.dashboard = async (req, res) => {
  try { 
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard', 'index.html'))
  } catch(err) {
    console.log(err);
  }
}