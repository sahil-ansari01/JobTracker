const { Reminder } = require('../models/reminder');
const { sendEmail } = require('../utils/emailService');

exports.createReminder = async (req, res) => {
  const { userId } = req.user;
  const { message, date } = req.body;

  try {
    const reminder = await Reminder.create({ userId, message, date });
    // Schedule the email reminder (logic for scheduling can be implemented using a job scheduler like node-cron)
    await sendEmail(userId, 'Reminder', message);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReminders = async (req, res) => {
  const { userId } = req.user;

  try {
    const reminders = await Reminder.findAll({ where: { userId } });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
