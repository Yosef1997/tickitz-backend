const { APP_URL } = process.env
const transactionModel = require('../models/transaction')
const transactionRelation = require('../models/transactionseat')
const queryString = require('querystring')

exports.listTransaction = async (req, res) => {
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

  const results = await transactionModel.getTransactionByCondition(cond)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'List of all Transaction',
      results,
      pageInfo: {
        totalData: results.length,
        totalPage: Math.ceil(results.length / cond.limit),
        currentPage: cond.page,
        nextLink: results.length < cond.limit ? null : APP_URL.concat(`/transaction?${nextQuery}`),
        prevLink: cond.page > 1 ? APP_URL.concat(`/transaction?${prevQuery}`) : null
      }
    })
  }
  return res.status(500).json({
    success: false,
    massage: 'failed to get list transaction'
  })
}

exports.detailTransaction = async (req, res) => {
  const id = req.params.id
  const results = await transactionModel.getTransactionByIdAsync(id)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'Details of Transaction',
      results: results[0]
    })
  }
  return res.status(400).json({
    success: false,
    message: 'Transaction not exists'
  })
}

exports.createTransaction = async (req, res) => {
  const data = req.body
  const selectedSeats = []
  if (typeof data.seats === 'object') {
    const results = await transactionRelation.checkTransactionSeatObject(data.seats)
    if (results.length !== data.seats.length) {
      return res.json({
        success: false,
        massage: 'Some seats are unavailable'
      })
    } else {
      results.forEach(item => {
        selectedSeats.push(item.id)
      })
    }
  } else if (typeof data.seats === 'string') {
    const results = await transactionRelation.checkTransactionSeatstring(data.seats)
    if (results.length !== data.seats.length) {
      return res.json({
        success: false,
        massage: 'Some seat are unavailable'
      })
    } else {
      results.forEach(item => {
        selectedSeats.push(item.id)
      })
    }
  }
  const transactionData = {
    movie: data.movie,
    date: data.date,
    location: data.location,
    cinema: data.cinema,
    time: data.time,
    category: data.category,
    createdBy: req.userData.id
  }
  try {
    const check = await transactionRelation.checkTransactionSeat(transactionData)
    if (check.length < 1) {
      const initialResult = await transactionModel.createTransaction(transactionData)
      if (initialResult.affectedRows > 0) {
        if (selectedSeats.length > 0) {
          await transactionRelation.createBulkTransactionSeat(initialResult.insertId, selectedSeats)
        }
        const transaction = await transactionModel.getTransactionByIdWithSeatAsync(initialResult.insertId)
        const seats = transaction.map(item => item.seatName)
        await transactionModel.insertSeatsinTransaction(initialResult.insertId, seats)
        console.log(seats)
        if (transaction.length > 0) {
          return res.json({
            success: true,
            message: 'Transaction successfully created',
            results: {
              id: transaction[0].id,
              movie: transaction[0].movie,
              date: transaction[0].date,
              location: transaction[0].location,
              cinema: transaction[0].cinema,
              time: transaction[0].time,
              category: transaction[0].category,
              // count: Number(data.seats.length),
              // totalPrice: Number(data.seats.length * 10),
              createdBy: transaction[0].createdBy
            }
          })
        }
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: 'Failed to create transaction'
    })
  }
}

exports.updateCinemas = async (req, res) => {
  const id = req.params.id
  const data = req.body
  const selectedShowTime = []
  if (typeof data.idShowTime === 'object') {
    const results = await transactionRelation.checkCinemaScheduleObject(data.idShowTime)
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
    const results = await transactionRelation.checkCinemaScheduleString(data.idShowTime)
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
    await transactionModel.updateCinema(id, updateData)
    await transactionRelation.deleteCinemaScheduleByIdAsync(id)
    await transactionRelation.createBulkCinemaSchedule(id, selectedShowTime)
    const movies = await transactionModel.getCinemasByIdWithShowTimeAsync(id)
    const showTime = movies.map(item => item.time)
    await transactionModel.insertShowTimeinCinema(id, showTime)
    const updateCinema = await transactionModel.getCinemaByIdAsync(id)
    return res.json({
      success: true,
      message: 'Cinema successfully updated',
      updateCinema
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: 'Failed to update Movie'
    })
  }
}

exports.deleteCinema = async (req, res) => {
  const { id } = req.params
  const initialResult = await transactionModel.getCinemaByIdAsync(id)
  if (initialResult.length > 0) {
    const results = await transactionModel.deleteCinemaByIdAsync(id)
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
