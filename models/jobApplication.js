const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const JobApplication = sequelize.define('JobApplication', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  applicationData: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

module.exports = JobApplication
