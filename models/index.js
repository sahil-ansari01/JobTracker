const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const models = {
  User: require('./user')(sequelize, Sequelize.DataTypes),
  Profile: require('./profile')(sequelize, Sequelize.DataTypes),
  JobApplication: require('./jobApplication')(sequelize, Sequelize.DataTypes),
  Reminder: require('./reminder')(sequelize, Sequelize.DataTypes),
  Company: require('./company')(sequelize, Sequelize.DataTypes),
  Note: require('./note')(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
