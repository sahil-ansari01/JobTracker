const { Note } = require('../models/note');
const path = require('path')

exports.notes = async(req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard', 'notes.html'))
  } catch (err) {
    console.log(err);
  }
}

exports.createNote = async (req, res) => {
  const { userId } = req.user;
  const { jobApplicationId, content } = req.body;

  try {
    const note = await Note.create({ userId, jobApplicationId, content });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
