const { APP_URL } = process.env
const queryString = require('querystring')
const timeModal = require('../models/showTime')

exports.listShowTime = async (req, res) => {
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
    const results = await timeModal.getShowTimeByCondition(cond)
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'List of Show Times',
        results,
        pageInfo: {
          totalData: results.length,
          totalPage: Math.ceil(results.length / cond.limit),
          currentPage: cond.page,
          nextLink: results.length < cond.limit ? null : APP_URL.concat(`/showtime?${nextQuery}`),
          prevLink: cond.page > 1 ? APP_URL.concat(`/showtime?${prevQuery}`) : null
        }
      })
    }
  } catch (error) {
    return res.status(500)
  }
}

exports.detailShowTime = async (req, res) => {
  const id = req.params.id
  const results = await timeModal.getShowTimeByIdAsync(id)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'Details of show time',
      results: results[0]
    })
  }
  return res.status(400).json({
    success: false,
    message: 'Show time not exist'
  })
}

exports.creatShowtime = async (req, res) => {
  try {
    const data = req.body
    const time = await timeModal.createShowTimeAsync(data)
    if (time.affectedRows > 0) {
      const getShowTime = await timeModal.getShowTimeByIdAsync(time.insertId)
      if (getShowTime.length > 0) {
        return res.json({
          success: true,
          message: 'Show time create successfully',
          getShowTime: getShowTime[0]
        })
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Show time create failed'
    })
  }
}

exports.deleteShowTime = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await timeModal.getShowTimeByIdAsync(id)
    if (initialResult.length > 0) {
      const results = await timeModal.deleteShowTimeByIdAsync(id)
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

exports.updateShowTime = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const update = await timeModal.updateShowTime(id, data)
    console.log(update)
    if (update.affectedRows > 0) {
      const getMovie = await timeModal.getShowTimeByIdAsync(id)
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
