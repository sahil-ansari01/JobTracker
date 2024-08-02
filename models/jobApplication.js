const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const JobApplication = sequelize.define('JobApplication', {
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = JobApplication
