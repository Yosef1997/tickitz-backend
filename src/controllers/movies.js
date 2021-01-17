const { LIMIT_DATA, APP_URL } = process.env

exports.listMovies = (req, res) => {
  const { limit = LIMIT_DATA, search = null } = req.query
  let { page = 1 } = req.query
  if (typeof (page) !== 'number') {
    page = Number(page)
  }
  const data = require('../helpers/listMovies')
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
    message: 'List of Movies',
    results,
    pageInfo: {
      totalData: results.length,
      currentPage: page,
      nextLink: nextPageData.length !== 0 ? `${APP_URL}/movies?page=${page + 1}` : null,
      prevLink: page > 1 ? `${APP_URL}/movies?page=${page - 1}` : null
    }
  })
}

exports.detailMovies = (req, res) => {
  const number = parseInt(req.params.id)
  const data = require('../helpers/listMovies')
  const results = data.find(movie => movie.id === number)

  return res.json({
    success: true,
    message: 'Details of Movie',
    results
  })
}
