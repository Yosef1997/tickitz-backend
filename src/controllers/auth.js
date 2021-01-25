const authModal = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_KEY } = process.env

exports.login = async (req, res) => {
  const { username, password } = req.body
  const existingUser = await authModal.getUserByConditionAsync({ username })
  if (existingUser.length > 0) {
    const compare = await bcrypt.compare(password, existingUser[0].password)
    if (compare) {
      const { id } = existingUser[0]
      const token = jwt.sign({ id }, APP_KEY)
      return res.json({
        success: true,
        massage: 'Login successfully',
        token
      })
    }
  }
  return res.status(401).json({
    success: true,
    massage: 'Wrong username or password'
  })
}

exports.register = async (req, res) => {
  const { username, password } = req.body
  const isExists = await authModal.getUserByConditionAsync({ username, password })
  if (isExists.length > 1) {
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password, salt)
    const results = await authModal.createUserAsync({ username, password: encryptedPassword })
    if (results.insertId > 0) {
      return res.json({
        success: true,
        massage: 'register successfully'
      })
    } else {
      return res.json({
        success: true,
        massage: 'register failed'
      })
    }
  } else {
    return res.json({
      success: true,
      massage: 'username or password have been used'
    })
  }
}
