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
      results
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

// const { LIMIT_DATA, APP_URL } = process.env
// const data = require('../helpers/listGenre')
// const dataMovies = require('../helpers/listMovies')

// exports.listGenre = (req, res) => {
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
//     message: 'List of Genre',
//     results,
//     pageInfo: {
//       totalData: results.length,
//       currentPage: page,
//       nextLink: nextPageData.length !== 0 ? `${APP_URL}/genre?page=${page + 1}` : null,
//       prevLink: page > 1 ? `${APP_URL}/genre?page=${page - 1}` : null
//     }
//   })
// }

// exports.Genre = (req, res) => {
//   const id = parseInt(req.params.id)
//   const results = data.find(genre => genre.id === id)
//   return res.json(results)
// }

// exports.detailGenre = (req, res) => {
//   const genre = req.params.name
//   const results = dataMovies.filter(movies => {
//     return movies.genre.toLowerCase().includes(genre.toLowerCase())
//   })
//   return res.json({
//     success: true,
//     message: 'List Movies With Genre',
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
