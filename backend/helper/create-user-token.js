const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res) => {
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, "f1o2g3l4r5")

  res.status(200).json({
    message: 'You are authenticated!',
    token: token,
    userId: user._id
  })
}

module.exports = createUserToken