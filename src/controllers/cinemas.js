const data = require('../helpers/listCinemas')

exports.listCinemas = (req, res) => {
  return res.json(data)
}

exports.detailCinemas = (req, res) => {
  const id = parseInt(req.params.id)
  const results = data.find(cinemas => cinemas.id === id)
  return res.json(results)
}
