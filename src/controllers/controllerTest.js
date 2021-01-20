const modaltest = require('../models/modaltest')

exports.createGenreRelation = (req, res) => {
  const data = req.body
  modaltest.createGenreRelation(data, (results) => {
    return res.json({
      success: true,
      massage: 'genre create success',
      results: {
        id: results.insertId,
        ...data
      }
    })
  })
}
