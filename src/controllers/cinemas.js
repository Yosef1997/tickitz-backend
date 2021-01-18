const data = require('../helpers/listCinemas')

exports.listCinemas = (req, res) => {
  return res.json(data)
}

exports.detailCinemas = (req, res) => {
  const id = parseInt(req.params.id)
  const results = data.find(cinemas => cinemas.id === id)
  return res.json(results)
}

exports.post = (req, res) => {
  const newData = [data.length + 1, req.body]
  data.push(newData)
  return res.json(data)
}

exports.put = (req, res) => {
  const newData = [data.length + 1, req.body]
  data.push(newData)
  return res.json(data)
}

exports.patch = (req, res) => {
  const id = parseInt(req.params.id)
  const results = data.filter(movies => {
    if (movies.id === id) {
      movies.id = id
      movies.name = req.body.name
      movies.genre = req.body.genre
      return movies
    } else {
      return res.status(404)
    }
  })

  return res.json(results)
}

exports.delete = (req, res) => {
  const id = parseInt(req.params.id)
  const results = data.filter(movies => movies.id !== id)
  return res.json(results)
}
