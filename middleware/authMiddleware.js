const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (ex) {
    // Handle invalid token or other errors
    res.status(400).json({ error: 'Invalid token.' });
  }
};
