const { APP_URL } = process.env
const cinemasModel = require('../models/cinemas')
const cinemasRelation = require('../models/cinemaSchedule')
const multer = require('multer')
const upload = require('../helpers/upload').single('picture')
const queryString = require('querystring')

exports.listCinemas = async (req, res) => {
  const cond = { ...req.body }
  cond.search = cond.search || ''
  cond.page = Number(cond.page) || 1
  cond.limit = Number(cond.limit) || 5
  cond.dataLimit = cond.limit * cond.page
  cond.offset = (cond.page - 1) * cond.limit
  cond.sort = cond.sort || 'id'
  cond.order = cond.order || 'ASC'

  const nextQuery = queryString.stringify({ ...req.body, page: cond.page + 1 })
  const prevQuery = queryString.stringify({ ...req.body, page: cond.page - 1 })

  const results = await cinemasModel.getCinemaByCondition(cond)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'List of all Cinemas',
      results,
      pageInfo: {
        totalData: results.length,
        totalPage: Math.ceil(results.length / cond.limit),
        currentPage: cond.page,
        nextLink: results.length < cond.limit ? null : APP_URL.concat(`/movies?${nextQuery}`),
        prevLink: cond.page > 1 ? APP_URL.concat(`/movies?${prevQuery}`) : null
      }
    })
  }
  return res.status(500).json({
    success: false,
    massage: 'failed to get list cinemas'
  })
}

exports.detailCinema = async (req, res) => {
  const id = req.params.id
  const results = await cinemasModel.getCinemaByIdAsync(id)
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
}

exports.createCinemas = (req, res) => {
  upload(req, res, async err => {
    const data = req.body
    const selectedShowTime = []
    if (err instanceof multer.MulterError) {
      return res.json({
        success: false,
        message: 'Error uploading file'
      })
    } else if (err) {
      return res.json({
        success: false,
        message: 'Error uploading file'
      })
    }
    if (typeof data.idShowTime === 'object') {
      const results = await cinemasRelation.checkCinemaScheduleObject(data.idShowTime)
      if (results.length !== data.idShowTime.length) {
        return res.json({
          success: false,
          massage: 'Some show time are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedShowTime.push(item.id)
        })
      }
    } else if (typeof data.idShowTime === 'string') {
      const results = await cinemasRelation.checkCinemaScheduleString(data.idShowTime)
      if (results.length !== data.idShowTime.length) {
        return res.json({
          success: false,
          massage: 'Some show time are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedShowTime.push(item.id)
        })
      }
    }
    const cinemaData = {
      name: data.name,
      address: data.address,
      priceOneSeat: data.priceOneSeat,
      picture: (req.file && req.file.path) || null,
      createdBy: req.userData.id
    }
    try {
      const initialResult = await cinemasModel.createCinema(cinemaData)
      if (initialResult.affectedRows > 0) {
        if (selectedShowTime.length > 0) {
          await cinemasRelation.createBulkCinemaSchedule(initialResult.insertId, selectedShowTime)
        }
        const cinemas = await cinemasModel.getCinemasByIdWithShowTimeAsync(initialResult.insertId)
        const showTime = cinemas.map(item => item.time)
        await cinemasModel.insertShowTimeinCinema(initialResult.insertId, showTime)
        console.log(showTime)
        if (cinemas.length > 0) {
          return res.json({
            success: true,
            message: 'Cinema successfully created',
            results: {
              id: cinemas[0].id,
              name: cinemas[0].name,
              address: cinemas[0].address,
              priceOneSeat: cinemas[0].priceOneSeat,
              time: cinemas.map(cinemas => cinemas.time),
              createdBy: cinemas[0].createdBy
            }
          })
        }
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        success: false,
        message: 'Failed to create cinema'
      })
    }
  })
}

exports.updateCinemas = (req, res) => {
  upload(req, res, async err => {
    const id = req.params.id
    const data = req.body
    const selectedShowTime = []
    if (err instanceof multer.MulterError) {
      return res.json({
        success: false,
        message: 'Error uploading file'
      })
    } else if (err) {
      return res.json({
        success: false,
        message: 'Error uploading file'
      })
    }
    if (typeof data.idShowTime === 'object') {
      const results = await cinemasRelation.checkCinemaScheduleObject(data.idShowTime)
      if (results.length !== data.idShowTime.length) {
        return res.json({
          success: false,
          massage: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedShowTime.push(item.id)
        })
      }
    } else if (typeof data.idShowTime === 'string') {
      const results = await cinemasRelation.checkCinemaScheduleString(data.idShowTime)
      if (results.length !== data.idShowTime.length) {
        return res.json({
          success: false,
          massage: 'Some genre are unavailable'
        })
      } else {
        results.forEach(item => {
          selectedShowTime.push(item.id)
        })
      }
    }

    const updateData = {
      name: data.name,
      address: data.address,
      priceOneSeat: data.priceOneSeat,
      time: data.idShowTime,
      picture: (req.file && req.file.path) || null,
      createdBy: req.userData.id
    }
    try {
      await cinemasModel.updateCinema(id, updateData)
      await cinemasRelation.deleteCinemaScheduleByIdAsync(id)
      const getMovieGenre = await cinemasRelation.createBulkCinemaSchedule(id, selectedShowTime)
      console.log(getMovieGenre)
      const movies = await cinemasModel.getCinemasByIdWithShowTimeAsync(id)
      const showTime = movies.map(item => item.time)
      await cinemasModel.insertShowTimeinCinema(id, showTime)
      return res.json({
        success: true,
        message: 'Movie successfully updated',
        movies
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

exports.deleteCinema = async (req, res) => {
  const { id } = req.params
  const initialResult = await cinemasModel.getCinemaByIdAsync(id)
  if (initialResult.length > 0) {
    const results = await cinemasModel.deleteCinemaByIdAsync(id)
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
