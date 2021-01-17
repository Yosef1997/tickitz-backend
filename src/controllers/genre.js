exports.genreMovies = (req, res) => {
  const data = require('../helpers/listMovies')
  const genreResults = data.filter(movies => movies.genre.toLowerCase().includes(req.params.name.toLowerCase()))
  console.log(genreResults)
  return res.json({
    success: true,
    massage: 'List genre of Movies',
    genreResults
  })
}
