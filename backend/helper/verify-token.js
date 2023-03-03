const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

const checkToken = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'Access denied!' })
  }

  const token = getToken(req)

  if(!token) {
    return res.status(401).json({ message: 'Access denied!'})
  }

  try {
    const verified = jwt.verify(token, 'f1o2g3l4r5')
    req.user = verified
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token!' })
  }
}

module.exports = checkToken