const { APP_URL } = process.env
const movieModel = require('../models/movies')

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
      results,
      pageInfo: {
        totalData: results.length,
        currentPage: cond.page,
        nextLink: results.length < cond.limit ? null : `${APP_URL}/movies?page=${cond.page + 1}`,
        prevLink: cond.page > 1 ? `${APP_URL}/movies?page=${cond.page - 1}` : null
      }

    })
  })
}

exports.listMovieByGenre = (req, res) => {
  const cond = req.params.name

  movieModel.getMovieByGenre(cond, results => {
    return res.json({
      success: true,
      message: 'Details of Movie',
      results
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
