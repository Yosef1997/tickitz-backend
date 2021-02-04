const { APP_URL } = process.env
const queryString = require('querystring')
const dateModal = require('../models/showdate')

exports.listDate = async (req, res) => {
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
    const results = await dateModal.getShowDateByCondition(cond)
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'List of dates',
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

exports.detailDate = async (req, res) => {
  const id = req.params.id
  const results = await dateModal.getShowDateByIdAsync(id)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'Details of date',
      results: results[0]
    })
  }
  return res.status(400).json({
    success: false,
    message: 'date not exist'
  })
}

exports.creatDate = async (req, res) => {
  try {
    const data = req.body
    data.createdBy = req.userData.id
    const time = await dateModal.createShowDateAsync(data)
    console.log(time)
    if (time.affectedRows > 0) {
      const getShowTime = await dateModal.getShowDateByIdAsync(time.insertId)
      if (getShowTime.length > 0) {
        return res.json({
          success: true,
          message: 'Date create successfully',
          getShowTime: getShowTime[0]
        })
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: 'Date create failed'
    })
  }
}

exports.deleteDate = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await dateModal.getShowDateByIdAsync(id)
    if (initialResult.length > 0) {
      const results = await dateModal.deleteShowDateByIdAsync(id)
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

exports.updateDate = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const update = await dateModal.updateShowDate(id, data)
    console.log(update)
    if (update.affectedRows > 0) {
      const getMovie = await dateModal.getShowDateByIdAsync(id)
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
