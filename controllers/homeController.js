const path = require('path')


exports.dashboard = async (req, res) => {
  try { 
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard', 'index.html'))
  } catch(err) {
    console.log(err);
  }
}
