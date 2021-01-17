const { LIMIT_DATA, APP_URL } = process.env
const data = require('../helpers/listGenre')

exports.listGenre = (req, res) => {
  const { limit = LIMIT_DATA, search = null } = req.query
  let { page = 1 } = req.query
  if (typeof (page) !== 'number') {
    page = Number(page)
  }
  const paging = (page * limit) - limit
  const nextPage = ((page + 1) * limit) - limit
  let nextPageData = []
  const offset = limit * page
  const nextPageOffset = limit * nextPage

  let results = data.slice(paging, offset)

  if (search) {
    results = results.filter(movie => {
      return movie.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
    nextPageData = data.slice(nextPage, nextPageOffset)
  } else {
    nextPageData = data.slice(nextPage, nextPageOffset)
    results = data.slice(paging, offset)
  }

  return res.json({
    success: true,
    message: 'List of Genre',
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: page,
      nextLink: nextPageData.length !== 0 ? `${APP_URL}/genre?page=${page + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/genre?page=${page - 1}` : null
    }
  })
}

exports.detailGenre = (req, res) => {
  const genreResults = data.filter(movies => movies.genre.toLowerCase().includes(req.params.name.toLowerCase()))
  console.log(genreResults)
  return res.json({
    success: true,
    massage: 'Detail genre of Movies',
    genreResults
  })
}
