require('dotenv').config()
const path = require('path')

const index = async (req, res) => {

  try {
    res.sendFile(path.resolve('../../../client/build/index.html'))
  } catch (err) {
    res.status(500)
  }
}

module.exports = {
  index
}
