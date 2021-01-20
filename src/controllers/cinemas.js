const { APP_URL } = process.env

const cinemasModel = require('../models/cinemas')

exports.listCinemas = (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  cinemasModel.getAllCinemas(results => {
    return res.json({
      success: true,
      message: 'List of all Cinemas',
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

exports.detailCinema = (req, res) => {
  const id = req.params.id
  cinemasModel.getCinemaById(id, results => {
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'Details of Cinema',
        results: results[0]
      })
    }
    return res.status(400).json({
      success: false,
      message: 'Cinema not exists'
    })
  })
}

exports.createCinema = (req, res) => {
  const data = req.body
  cinemasModel.createCinema(data, (results) => {
    if (results.affectedRows > 0) {
      cinemasModel.getCinemaById(results.insertId, (finalResult) => {
        if (finalResult.length > 0) {
          return res.json({
            success: true,
            message: 'Details of Cinema',
            results: finalResult[0]
          })
        }
        return res.status(400).json({
          success: false,
          message: 'Failed to create Cinema  '
        })
      })
    }
  })
}

exports.deleteCinema = async (req, res) => {
  const { id } = req.params
  const initialResult = await cinemasModel.getCinemaByIdAsync(id)
  if (initialResult.length > 0) {
    const results = await cinemasModel.getCinemaByIdAsync(id)
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

exports.updateCinema = (req, res) => {
  const id = req.params.id
  const data = req.body
  cinemasModel.getCinemaById(id, initialResult => {
    if (initialResult.length > 0) {
      cinemasModel.updateCinema(id, data, results => {
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
