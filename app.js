const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { sequelize, User, Profile, JobApplication, Reminder, Company, Note } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', require('./routes/authRoutes'));
app.use('/profile', require('./routes/profileRoutes'));
app.use('/jobApplications', require('./routes/jobApplicationRoutes'));
app.use('/reminders', require('./routes/reminderRoutes'));
app.use('/companies', require('./routes/companyRoutes'));
app.use('/search', require('./routes/searchRoutes'));
app.use('/notes', require('./routes/noteRoutes'));

const PORT = process.env.PORT || 3000;

// Define associations
User.hasOne(Profile, {
  foreignKey: 'userId',
  as: 'profile'
});
Profile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

User.hasMany(JobApplication, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
JobApplication.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
JobApplication.hasMany(Note, {
  foreignKey: 'jobApplicationId',
  onDelete: 'CASCADE'
});
Note.belongsTo(JobApplication, {
  foreignKey: 'jobApplicationId',
  onDelete: 'CASCADE'
});

User.hasMany(Reminder, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Reminder.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Company.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
User.hasMany(Company, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Database URL: ${process.env.DB_HOST}`);
    try {
      await sequelize.authenticate();
      console.log('Database connected');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
}).catch((error) => {
  console.error('Error syncing database:', error);
});
