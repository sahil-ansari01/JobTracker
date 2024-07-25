module.exports = (sequelize, DataTypes) => {
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

  JobApplication.associate = (models) => {
    JobApplication.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    JobApplication.hasMany(models.Note, {
      foreignKey: 'jobApplicationId',
      onDelete: 'CASCADE',
    });
  };

  return JobApplication;
};
