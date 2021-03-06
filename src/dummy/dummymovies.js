// const data = require('../helpers/listMovies')

// Showing list Movies with paging
// exports.listMovies = (req, res) => {
//   const { limit = LIMIT_DATA, search = null } = req.query
//   let { page = 1 } = req.query
//   if (typeof (page) !== 'number') {
//     page = Number(page)
//   }
//   const paging = (page * limit) - limit
//   const nextPage = ((page + 1) * limit) - limit
//   let nextPageData = []
//   const offset = limit * page
//   const nextPageOffset = limit * nextPage

//   let results = data.slice(paging, offset)

//   if (search) {
//     results = results.filter(movie => {
//       return movie.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
//     })
//     nextPageData = data.slice(nextPage, nextPageOffset)
//   } else {
//     nextPageData = data.slice(nextPage, nextPageOffset)
//     results = data.slice(paging, offset)
//   }

//   return res.json({
//     success: true,
//     message: 'List of Movies',
//     results,
// pageInfo: {
//   totalData: results.length,
//   currentPage: page,
//   nextLink: nextPageData.length !== 0 ? `${APP_URL}/movies?page=${page + 1}` : null,
//   prevLink: page > 1 ? `${APP_URL}/movies?page=${page - 1}` : null
// }
//   })
// }
// // Showing list Movies based on id
// exports.detailMovies = (req, res) => {
//   const number = parseInt(req.params.id)
//   const results = data.find(movie => movie.id === number)

//   return res.json({
//     success: true,
//     message: 'Details of Movie',
//     results
//   })
// }

// exports.post = (req, res) => {
//   const newData = [data.length + 1, req.body]
//   data.push(newData)
//   return res.json(data)
// }

// exports.put = (req, res) => {
//   const newData = [data.length + 1, req.body]
//   data.push(newData)
//   return res.json(data)
// }

// exports.patch = (req, res) => {
//   const id = parseInt(req.params.id)
//   const results = data.filter(movies => {
//     if (movies.id === id) {
//       movies.id = id
//       movies.name = req.body.name
//       movies.genre = req.body.genre
//       return movies
//     } else {
//       return res.status(404)
//     }
//   })

//   return res.json(results)
// }

// exports.delete = (req, res) => {
//   const id = parseInt(req.params.id)
//   const results = data.filter(movies => movies.id !== id)
//   return res.json(results)
// }
