const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const sequelize = require('./utils/database');
const Profile = require('./models/profile');
const JobApplication = require('./models/jobApplication');
const Reminder = require('./models/reminder');
const Company = require('./models/company');
const Note = require('./models/note');
const User = require('./models/user');

console.log(User);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

// Middleware to serve static files
app.use('/auth/css', express.static(path.join(__dirname, 'public/css')));
app.use('/auth/js', express.static(path.join(__dirname, 'public/js')));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/jobtracker', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

app.use('/auth', require('./routes/authRoutes'));
app.use('/home', require('./routes/homeRoutes.js'))
app.use('/profile', require('./routes/profileRoutes'));
app.use('/progress', require('./routes/progressRoutes'));
app.use('/applications', require('./routes/jobApplicationRoutes'));
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
sequelize.sync().then(() => {
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
