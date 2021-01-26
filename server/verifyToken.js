const jwt = require('jsonwebtoken');
const Constants = require('./Constants')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.json({ message: Constants.notAuthorized })
  if (!authHeader.startsWith("Bearer ")) return res.json({ message: Constants.notAuthorized })

  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    //req.user.id = userId //
    next();
  } catch (err) {
    res.status(500).json({ message: Constants.tokenExpired })
  }
}