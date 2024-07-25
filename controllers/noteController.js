const { Note } = require('../models/note');

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
