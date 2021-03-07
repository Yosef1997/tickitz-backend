const authModal = require('../models/users')
const response = require('../middlewares/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_KEY } = process.env

exports.login = async (req, res) => {
  const { email, password } = req.body
  const existingUser = await authModal.getUserByConditionAsync({ email })
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

// exports.updateUser = async (req, res) => {
//   try {
//     const id = req.params.id
//     const {
//       firstname,
//       lastname,
//       newPassword,
//       password,
//       phone,
//       ...data
//     } = req.body
//     const salt = await bcrypt.genSalt()

//     const initialResults = await authModal.getUserByIdAsync(id)
//     console.log(initialResults)
//     if (initialResults.length < 1) {
//       return response(res, 404, false, 'User Not Found')
//     }
//     // firstname
//     if (firstname) {
//       if (firstname === initialResults[0].firstname) {
//         const deletefirstName = await authModal.updateUser(id, { firstname: null })
//         console.log(deletefirstName)
//         if (deletefirstName.affectedRows > 0) {
//           return response(res, 200, true, 'First name has been deleted', { firstname: null })
//         }
//         return response(res, 400, false, 'Cant delete data')
//       } else {
//         const updateFirstName = await authModal.updateUser(id, { firstname: firstname })
//         if (updateFirstName.affectedRows > 0) {
//           return response(res, 200, true, 'Phone number hasbeen updated', { id, firstname })
//         }
//         return response(res, 400, false, 'Cant update phone number1')
//       }
//     }

//     // lastname
//     if (lastname) {
//       if (lastname === initialResults[0].lastname) {
//         const deleteLastName = await authModal.updateUser(id, { lastname: null })
//         if (deleteLastName.affectedRows > 0) {
//           return response(res, 200, true, 'Last name has been deleted', { lastname: null })
//         }
//         return response(res, 400, false, 'Cant delete data')
//       } else {
//         const updateLastName = await authModal.updateUser(id, { lastname: lastname })
//         if (updateLastName.affectedRows > 0) {
//           return response(res, 200, true, 'Phone number hasbeen updated', { id, lastname })
//         }
//         return response(res, 400, false, 'Cant update phone number1')
//       }
//     }

//     // password
//     if (password) {
//       const compare = bcrypt.compareSync(password, initialResults[0].password)
//       if (compare) {
//         const encryptedNewPassword = await bcrypt.hash(newPassword, salt)
//         const passwordResult = await authModal.updateUser(id, { password: encryptedNewPassword })
//         if (passwordResult.affectedRows > 0) {
//           return response(res, 200, true, 'Password have been updated', { id: initialResults[0].id })
//         }
//         return response(res, 400, false, 'Password cant update')
//       }
//       return response(res, 401, false, 'Wrong current password')
//     }

//     // phone
//     if (phone) {
//       if (phone === initialResults[0].phone) {
//         const deletePhoneNumber = await authModal.updateUser(id, { phone: null })
//         if (deletePhoneNumber.affectedRows > 0) {
//           return response(res, 200, true, 'Phone number has been deleted', { phone: null })
//         }
//         return response(res, 400, false, 'Cant delete phone number')
//       } else {
//         const updatePhoneNumber = await authModal.updateUser(id, { phone: parseInt(phone) })
//         if (updatePhoneNumber.affectedRows > 0) {
//           return response(res, 200, true, 'Phone number hasbeen updated', { id, phone })
//         } return response(res, 400, false, 'Cant update phone number1')
//       }
//     }

//     // image
//     if (req.file) {
//       // const updatePicture = await userModel.updateUser(id, {picture: req.file.path})
//       const picture = req.file.filename
//       const uploadImage = await authModal.updateUser(id, { picture })
//       if (uploadImage.affectedRows > 0) {
//         if (initialResults[0].picture !== null) {
//           fs.unlinkSync(`upload/profile/${initialResults[0].picture}`)
//         }
//         return response(res, 200, true, 'Image hash been Updated', { id, picture })
//       }
//       return response(res, 400, false, 'Cant update image')
//     }

//     // info
//     const finalResult = await authModal.updateUser(id, data)
//     if (finalResult.affectedRows > 0) {
//       return response(res, 200, true, 'Personal Information has been updated', { ...initialResults[0], ...data })
//     }
//     return response(res, 400, false, 'Cant Update personal Information')
//   } catch (err) {
//     console.log(err)
//     return response(res, 400, false, 'Bad Request')
//   }
// }

exports.detailUser = async (req, res) => {
  try {
    const { id } = req.params
    const getData = await authModal.getUserByConditionAsync({ id })
    console.log(getData)
    if (getData.length > 0) {
      return response(res, 200, true, 'Detail user', getData[0])
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, 'User not found')
  }
}

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const update = await authModal.updateUser(id, data)
    console.log(update)
    if (update.affectedRows > 0) {
      const getUser = await authModal.getUserByIdAsync(id)
      if (getUser.length > 0) {
        return response(res, 200, true, 'Update data success', getUser)
      }
    }
  } catch (error) {
    return res.json({
      success: false,
      message: 'Failed to update data'
    })
  }
}
