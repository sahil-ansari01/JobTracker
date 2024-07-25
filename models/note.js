module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Note.associate = (models) => {
    Note.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Note.belongsTo(models.JobApplication, {
      foreignKey: 'jobApplicationId',
      onDelete: 'CASCADE',
    });
  };

  return Note;
};
