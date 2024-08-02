const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Reminder = sequelize.define('Reminder', {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Reminder;