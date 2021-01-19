// const { APP_URL } = process.env
const movieModel = require('../models/movies')
// const db = require('../helpers/db')

exports.listMovies = (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.offset = (cond.page - 1) * cond.limit
  cond.nextPage = cond.page + 1
  cond.nextOffset = cond.nextPage * 5
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  movieModel.getMoviesByCondition(cond, results => {
    return res.json({
      success: true,
      message: 'List of all Movies',
      results
      // pageInfo: {
      //   totalData: results.length,
      //   currentPage: cond.page,
      //   nextLink: data.length !== 0 ? `${APP_URL}/movies?page=${cond.page + 1}` : null,
      //   prevLink: cond.page > 1 ? `${APP_URL}/movies?page=${cond.page - 1}` : null
      // }

    })
  })
}

exports.detailMovies = (req, res) => {
  const id = req.params.id
  movieModel.getMovieById(id, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Details of Movie',
        results: results[0]
      })
    }
    return res.status(400).json({
      success: false,
      message: 'Movies not exists'
    })
  })
}

exports.createMovies = (req, res) => {
  const data = req.body
  movieModel.createMovies(data, (results) => {
    if (results.affectedRows > 0) {
      movieModel.getMovieById(results.insertId, (finalResult) => {
        if (finalResult.length > 0) {
          return res.json({
            success: true,
            message: 'Details of Movie',
            results: finalResult[0]
          })
        }
        return res.status(400).json({
          success: false,
          message: 'Failed to create Movie'
        })
      })
    }
  })
}

exports.deleteMovie = async (req, res) => {
  const { id } = req.params
  const initialResult = await movieModel.getMovieByIdAsync(id)
  if (initialResult.length > 0) {
    const results = await movieModel.getMovieByIdAsync(id)
    if (results) {
      return res.json({
        success: true,
        message: 'Data deleted successfully',
        results: initialResult[0]
      })
    }
  }
  return res.json({
    success: false,
    message: 'Failed to delete data'
  })
}

// movieModel.getMovieById(id, (initialResult) => {
//   if (initialResult.length > 0) {
//     movieModel.deleteMovieById(id, results => {
//       return res.json({
//         success: true,
//         message: 'Data deleted successfully',
//         results: initialResult[0]
//       })
//     })
//   } else {
//     return res.json({
//       success: false,
//       message: 'Failed to delete data'
//     })
//   }
// })

exports.updateMovie = (req, res) => {
  const { id } = req.params
  const data = req.body
  movieModel.getMovieById(id, initialResult => {
    if (initialResult.length > 0) {
      movieModel.updateMovie(id, data, results => {
        return res.json({
          success: true,
          message: 'Update data success',
          results: {
            ...initialResult[0],
            ...data
          }
        })
      })
    } else {
      return res.json({
        success: false,
        message: 'Failed to update data'
      })
    }
  })
}
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
