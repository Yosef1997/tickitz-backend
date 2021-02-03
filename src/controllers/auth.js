const authModal = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_KEY } = process.env

exports.login = async (req, res) => {
  const { email, password } = req.body
  const existingUser = await authModal.getUserByConditionAsync({ email })
  if (existingUser.length > 0) {
    console.log(existingUser.length)
    const compare = await bcrypt.compare(password, existingUser[0].password)
    console.log(compare)
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
    success: false,
    message: 'Wrong email or password'
  })
}

exports.register = async (req, res) => {
  const { email, password } = req.body
  const isExists = await authModal.getUserByConditionAsync({ email })
  if (isExists.length < 1) {
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(password, salt)
    const results = await authModal.createUserAsync({ email, password: encryptedPassword })
    if (results.insertId > 0) {
      return res.json({
        success: true,
        result: 'register successfully'
      })
    } else {
      return res.json({
        success: false,
        result: 'register failed'
      })
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'email or password have been used'
    })
  }
}
