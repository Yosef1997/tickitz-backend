const { APP_URL } = process.env
const movieModel = require('../models/movies')
const genrerelation = require('../models/moviegenre')
const multer = require('multer')
const upload = require('../helpers/upload').single('picture')
const queryString = require('querystring')

exports.listMovies = async (req, res) => {
  const cond = { ...req.body }
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.offset = (cond.page - 1) * cond.limit
  cond.nextPage = cond.page + 1
  cond.nextOffset = cond.nextPage * 5
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  const nextQuery = queryString.stringify({ ...req.body, page: cond.page + 1 })
  const prevQuery = queryString.stringify({ ...req.body, page: cond.page - 1 })

  const results = await movieModel.getMoviesByCondition(cond)
  if (results.length > 0) {
    return res.status(200).json({
      success: true,
      message: 'List of all Movies',
      results,
      pageInfo: {
        totalData: results.length,
        totalPage: Math.ceil(results.length / cond.limit),
        currentPage: cond.page,
        nextLink: results.length < cond.limit ? null : APP_URL.concat(`/movies?${nextQuery}`),
        prevLink: cond.page > 1 ? APP_URL.concat(`/movies?${prevQuery}`) : null
      }
    })
  } else {
    return res.status(500)
  }
}

exports.listMovieByGenre = async (req, res) => {
  const cond = req.params.name
  const results = await movieModel.getMoviesByCondition(cond)
  if (results.length > 0) {
    return res.status(200).json({
      success: true,
      message: 'Details of Movie',
      results
    })
  } else {
    return res.status(400).json({
      success: true,
      message: `Movie with genre ${cond} not found`
    })
  }
}

exports.detailMovies = async (req, res) => {
  const id = req.params.id
  const results = await movieModel.getMovieByIdAsync(id)
  console.log(results)
  if (results.length > 0) {
    return res.status(200).json({
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
      return res.status(200).json({
        success: true,
        message: 'Data deleted successfully',
        results: initialResult[0]
      })
    }
  }
  return res.status(400).json({
    success: false,
    message: 'Failed to delete data'
  })
}

exports.updateMovie = (req, res) => {
  upload(req, res, async err => {
    const id = req.params.id
    const data = req.body
    const selectedGenre = []
    const selectedDate = []
    const selectedLocation = []
    const selectedCinema = []
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: 'Error uploading file'
      })
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error uploading file'
      })
    }
    if (typeof data.idGenre === 'object') {
      const results = await genrerelation.checkGenresAsync(data.idGenre)
      if (results.length !== data.idGenre.length) {
        return res.status(400).json({
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
        return res.status(400).json({
          success: false,
          massage: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    }
    if (typeof data.idDate === 'string') {
      const results = await genrerelation.checkDate(data.idDate)
      if (results.length !== data.idDate.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some Date are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedDate.push(item.id)
        })
      }
    }

    if (typeof data.idLocation === 'object') {
      const results = await genrerelation.checklocationAsync(data.idLocation)
      if (results.length !== data.idLocation.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some Location are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedLocation.push(item.id)
        })
      }
    }

    if (typeof data.idCinema === 'object') {
      const results = await genrerelation.checkCinemaAsync(data.idCinema)
      if (results.length !== data.idCinema.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some Cinema are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedCinema.push(item.id)
        })
      }
    }

    const updateData = {
      name: data.name,
      releaseDate: data.releaseDate,
      duration: data.duration,
      genre: data.idGenre,
      description: data.description,
      director: data.director,
      stars: data.stars,
      picture: (req.file && req.file.path) || null,
      createdBy: req.userData.id
    }
    try {
      await movieModel.updateMovie(id, updateData)
      await genrerelation.deleteMovieGenreByIdAsync(id)
      await genrerelation.deleteMovieDateByIdAsync(id)
      await genrerelation.deleteMovieLocationByIdAsync(id)
      await genrerelation.deleteMovieCinemaByIdAsync(id)
      await genrerelation.createBulkMovieGenres(id, selectedGenre)
      await genrerelation.createBulkMovieDate(id, selectedDate)
      await genrerelation.createBulkMovieLocation(id, selectedLocation)
      await genrerelation.createBulkMovieCinema(id, selectedCinema)
      const moviesGenre = await movieModel.getMovieByIdWithGenreAsync(id)
      const genre = moviesGenre.map(item => item.genre)
      await movieModel.insertGenreinMovie(id, genre)
      const moviesDate = await movieModel.getMovieByIdWithDateAsync(id)
      const date = moviesDate.map(item => item.date)
      console.log(date)
      await movieModel.insertDateinMovie(id, date)
      const moviesLocation = await movieModel.getMovieByIdWithLocationAsync(id)
      const location = moviesLocation.map(item => item.city)
      await movieModel.insertLocationinMovie(id, location)
      const moviesCinema = await movieModel.getMovieByIdWithcinemasAsync(id)
      const cinema = moviesCinema.map(item => item.cinemaName)
      await movieModel.insertCinemainMovie(id, cinema)

      const updateMovie = await movieModel.getMovieByIdAsync(id)

      return res.status(200).json({
        success: true,
        message: 'Movie successfully updated',
        updateMovie
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        success: false,
        message: 'Failed to update Movie'
      })
    }
  })
}

exports.createMoviesAsync = (req, res) => {
  upload(req, res, async err => {
    const data = req.body
    const selectedGenre = []
    const selectedDate = []
    const selectedLocation = []
    const selectedCinema = []
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: 'Error uploading file'
      })
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error uploading file'
      })
    }
    if (typeof data.idGenre === 'object') {
      const results = await genrerelation.checkGenresAsync(data.idGenre)
      if (results.length !== data.idGenre.length) {
        return res.status(400).json({
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
        return res.status(400).json({
          success: false,
          massage: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedGenre.push(item.id)
        })
      }
    }

    if (typeof data.idDate === 'string') {
      const results = await genrerelation.checkDate(data.idDate)
      if (results.length !== data.idDate.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some Date are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedDate.push(item.id)
        })
      }
    }

    if (typeof data.idLocation === 'object') {
      const results = await genrerelation.checklocationAsync(data.idLocation)
      if (results.length !== data.idLocation.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some Location are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedLocation.push(item.id)
        })
      }
    }

    if (typeof data.idCinema === 'object') {
      const results = await genrerelation.checkCinemaAsync(data.idCinema)
      if (results.length !== data.idCinema.length) {
        return res.status(400).json({
          success: false,
          massage: 'Some Cinema are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedCinema.push(item.id)
        })
      }
    }
    const movieData = {
      name: data.name,
      releaseDate: data.releaseDate,
      duration: data.duration,
      description: data.description,
      director: data.director,
      stars: data.stars,
      picture: (req.file && req.file.path) || null,
      createdBy: req.userData.id
    }
    console.log(movieData)
    const initialResult = await movieModel.createMoviesAsync(movieData)
    if (initialResult.affectedRows > 0) {
      if (selectedGenre.length > 0) {
        await genrerelation.createBulkMovieGenres(initialResult.insertId, selectedGenre)
      }
      if (selectedDate.length > 0) {
        await genrerelation.createBulkMovieDate(initialResult.insertId, selectedDate)
      }
      if (selectedLocation.length > 0) {
        await genrerelation.createBulkMovieLocation(initialResult.insertId, selectedLocation)
      }
      if (selectedCinema.length > 0) {
        await genrerelation.createBulkMovieCinema(initialResult.insertId, selectedCinema)
      }
      const moviesGenre = await movieModel.getMovieByIdWithGenreAsync(initialResult.insertId)
      const genre = moviesGenre.map(item => item.genre)
      await movieModel.insertGenreinMovie(initialResult.insertId, genre)
      const moviesDate = await movieModel.getMovieByIdWithDateAsync(initialResult.insertId)
      const date = moviesDate.map(item => item.date)
      await movieModel.insertDateinMovie(initialResult.insertId, date)
      const moviesLocation = await movieModel.getMovieByIdWithLocationAsync(initialResult.insertId)
      const location = moviesLocation.map(item => item.city)
      await movieModel.insertLocationinMovie(initialResult.insertId, location)
      const moviesCinema = await movieModel.getMovieByIdWithcinemasAsync(initialResult.insertId)
      const cinema = moviesCinema.map(item => item.cinemaName)
      await movieModel.insertCinemainMovie(initialResult.insertId, cinema)
      if (moviesCinema.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Movie successfully created',
          results: {
            id: moviesGenre[0].id,
            name: moviesGenre[0].name,
            releaseDate: moviesGenre[0].releaseDate,
            duration: moviesGenre[0].duration,
            genre: moviesGenre.map(movies => movies.genre),
            description: moviesGenre[0].description,
            director: moviesGenre[0].director,
            stars: moviesGenre[0].stars,
            createdBy: moviesGenre[0].createdBy,
            date: moviesDate.map(movies => movies.date),
            location: moviesLocation.map(movies => movies.city),
            cinema: moviesCinema.map(movies => movies.cinemaName)
          }
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'Failed to create Movie'
        })
      }
    }
  })
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
