const { APP_URL } = process.env
const genreModel = require('../models/genre')

exports.listGenre = (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  genreModel.getGenreByCondition(cond, results => {
    return res.json({
      success: true,
      message: 'List of all Genre',
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

exports.moviesGenre = (req, res) => {
  const cond = req.params.name

  genreModel.getMovieByGenre(cond, results => {
    return res.json({
      success: true,
      message: `List Movies with Genre ${cond}`,
      results
    })
  })
}

exports.detailGenre = (req, res) => {
  const id = req.params.id
  genreModel.getGenreById(id, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Details of Genre',
        results: results[0]
      })
    }
    return res.status(400).json({
      success: false,
      message: 'Genre not exists'
    })
  })
}

exports.createGenre = (req, res) => {
  const data = req.body
  genreModel.createGenre(data, (results) => {
    if (results.affectedRows > 0) {
      genreModel.getGenreById(results.insertId, (finalResult) => {
        if (finalResult.length > 0) {
          return res.json({
            success: true,
            message: 'Details of Genre',
            results: finalResult[0]
          })
        }
        return res.status(400).json({
          success: false,
          message: 'Failed to create Genre  '
        })
      })
    }
  })
}

exports.deleteGenre = async (req, res) => {
  const { id } = req.params
  const initialResult = await genreModel.getGenreByIdAsync(id)
  if (initialResult.length > 0) {
    const results = await genreModel.getGenreByIdAsync(id)
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
}

exports.updateGenre = (req, res) => {
  const id = req.params.id
  const data = req.body
  genreModel.getGenreById(id, initialResult => {
    if (initialResult.length > 0) {
      genreModel.updateGenre(id, data, results => {
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
