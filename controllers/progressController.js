const path = require('path')

exports.progress = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard', 'progress.html'))
  } catch (err) {
    console.log(err);
  }
}
