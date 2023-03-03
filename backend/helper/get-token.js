const getToken = (req) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(" ")[1]

  if(!token) return res.status(401).json({ message: "Token not found"})

  return token
}

module.exports = getToken