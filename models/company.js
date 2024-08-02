const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Company;
