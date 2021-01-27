const { APP_URL } = process.env
const queryString = require('querystring')
const seatsModal = require('../models/seats')

exports.listSeats = async (req, res) => {
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
  try {
    const results = await seatsModal.getSeatsByCondition(cond)
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'List of seats',
        results,
        pageInfo: {
          totalData: results.length,
          totalPage: Math.ceil(results.length / cond.limit),
          currentPage: cond.page,
          nextLink: results.length < cond.limit ? null : APP_URL.concat(`/seats?${nextQuery}`),
          prevLink: cond.page > 1 ? APP_URL.concat(`/seats?${prevQuery}`) : null
        }
      })
    }
  } catch (error) {
    return res.status(500)
  }
}

exports.detailSeats = async (req, res) => {
  const id = req.params.id
  const results = await seatsModal.getSeatsByIdAsync(id)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'Details of seat',
      results: results[0]
    })
  }
  return res.status(400).json({
    success: false,
    message: 'seat not exist'
  })
}

exports.creatSeats = async (req, res) => {
  try {
    const data = req.body
    data.createdBy = req.userData.id
    const time = await seatsModal.createSeatsAsync(data)
    if (time.affectedRows > 0) {
      const getShowTime = await seatsModal.getSeatsByIdAsync(time.insertId)
      if (getShowTime.length > 0) {
        return res.json({
          success: true,
          message: 'Seat create successfully',
          getShowTime: getShowTime[0]
        })
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Seat create failed'
    })
  }
}

exports.deleteSeat = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await seatsModal.getSeatsByIdAsync(id)
    if (initialResult.length > 0) {
      const results = await seatsModal.deleteSeatsByIdAsync(id)
      if (results) {
        return res.json({
          success: true,
          message: 'Data deleted successfully',
          results: initialResult[0]
        })
      }
    }
  } catch (error) {
    return res.json({
      success: false,
      message: 'Failed to delete data'
    })
  }
}

exports.updateSeat = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const update = await seatsModal.updateSeats(id, data)
    console.log(update)
    if (update.affectedRows > 0) {
      const getMovie = await seatsModal.getSeatsByIdAsync(id)
      if (getMovie.length > 0) {
        return res.json({
          success: true,
          message: 'Update data success',
          getMovie
        })
      }
    }
  } catch (eror) {
    return res.json({
      success: false,
      message: 'Failed to update data'
    })
  }
}
