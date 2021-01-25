const jwt = require('jsonwebtoken')
const { APP_KEY } = process.env

exports.authCheck = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.substr(7)
    const data = jwt.verify(token, APP_KEY)
    if (data) {
      req.userData = data
      return next()
    }
  }
  return res.status(401).json({
    success: false,
    massage: 'Authorization needed'
  })
}
