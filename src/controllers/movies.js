const { APP_URL } = process.env
const movieModel = require('../models/movies')
const genrerelation = require('../models/moviegenre')

exports.listMovies = async (req, res) => {
  const cond = req.query
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.offset = (cond.page - 1) * cond.limit
  cond.nextPage = cond.page + 1
  cond.nextOffset = cond.nextPage * 5
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  const results = await movieModel.getMoviesByCondition(cond)
  if (results.length > 0) {
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
  } else {
    return res.status(500)
  }
}

exports.listMovieByGenre = async (req, res) => {
  const cond = req.params.name
  const results = await movieModel.getMovieByGenre(cond)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'Details of Movie',
      results
    })
  } else {
    return res.json({
      success: true,
      message: `Movie with genre ${cond} not found`
    })
  }
}

exports.detailMovies = async (req, res) => {
  const id = req.params.id
  const results = await movieModel.getMovieByIdAsync(id)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'Details of Movie',
      results: results[0]
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'Movies not exists'
    })
  }
}

exports.deleteMovie = async (req, res) => {
  const { id } = req.params
  const initialResult = await movieModel.getMovieByIdAsync(id)
  if (initialResult.length > 0) {
    const results = await movieModel.deleteMovieByIdAsync(id)
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

exports.createMoviesAsync = async (req, res) => {
  const data = req.body
  const selectedGenre = []
  if (typeof data.idGenre === 'object') {
    const results = await genrerelation.checkGenresAsync(data.idGenre)
    if (results.length !== data.idGenre.length) {
      return res.json({
        success: false,
        massage: 'Some genre are unavailable'
      })
    } else {
      results.forEach(item => {
        selectedGenre.push(item.id)
      })
    }
  } else if (typeof data.idGenre === 'string') {
    const results = await genrerelation.checkGenres(data.idGenre)
    if (results.length !== data.idGenre.length) {
      return res.json({
        success: false,
        massage: 'Some genre are unavailable'
      })
    } else {
      results.forEach(item => {
        selectedGenre.push(item.id)
      })
    }
  }
  const movieData = {
    name: data.name,
    releaseDate: data.releaseDate,
    duration: data.duration,
    description: data.description,
    director: data.director,
    stars: data.stars
  }
  const initialResult = await movieModel.createMoviesAsync(movieData)
  if (initialResult.affectedRows > 0) {
    if (selectedGenre.length > 0) {
      await genrerelation.createBulkMovieGenres(initialResult.insertId, selectedGenre)
    }
    const Genre = await genrerelation.checkGenresAsync(selectedGenre)
    const idGenre = Genre.map(item => item.genre)
    await movieModel.insertGenreinMovie(initialResult.insertId, idGenre)
    const movies = await movieModel.getMovieByIdWithGenreAsync(initialResult.insertId)
    if (movies.length > 0) {
      return res.json({
        success: true,
        message: 'Movie successfully created',
        results: {
          id: movies[0].id,
          name: movies[0].name,
          releaseDate: movies[0].releaseDate,
          duration: movies[0].duration,
          genre: movies[0].genre,
          description: movies[0].description,
          director: movies[0].director,
          stars: movies[0].stars
        }
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to create Movie'
      })
    }
  }
}

// exports.createMovies = (req, res) => {
//   const { name, releaseDate, duration, genre, description, director, stars } = req.body

//   if (name === '' || releaseDate === '' || duration === '' || genre === '' || description === '' || director === '' || stars === '') {
//     return res.status(400).json({
//       success: false,
//       message: 'Failed to create Movie, Please fill all form'
//     })
//   } else {
//     movieModel.createMovies({ name, releaseDate, duration, genre, description, director, stars }, (results) => {
//       if (results.affectedRows > 0) {
//         movieModel.getMovieById(results.insertId, (finalResult) => {
//           if (finalResult.length > 0) {
//             return res.json({
//               success: true,
//               message: 'Details of Movie',
//               results: finalResult[0]
//             })
//           }
//         })
//       }
//     })
//   }
// }

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
