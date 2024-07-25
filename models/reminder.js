module.exports = (sequelize, DataTypes) => {
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

  return Reminder;
};
