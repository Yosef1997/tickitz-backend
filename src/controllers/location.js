const { APP_URL } = process.env
const queryString = require('querystring')
const locationModal = require('../models/location')

exports.listLocation = async (req, res) => {
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
    const results = await locationModal.getLocationByCondition(cond)
    if (results.length > 0) {
      return res.json({
        success: true,
        message: 'List of Location',
        results,
        pageInfo: {
          totalData: results.length,
          totalPage: Math.ceil(results.length / cond.limit),
          currentPage: cond.page,
          nextLink: results.length < cond.limit ? null : APP_URL.concat(`/location?${nextQuery}`),
          prevLink: cond.page > 1 ? APP_URL.concat(`/location?${prevQuery}`) : null
        }
      })
    }
  } catch (error) {
    return res.status(500)
  }
}

exports.detailLocation = async (req, res) => {
  const id = req.params.id
  const results = await locationModal.getLocationByIdAsync(id)
  if (results.length > 0) {
    return res.json({
      success: true,
      message: 'Details of location',
      results: results[0]
    })
  }
  return res.status(400).json({
    success: false,
    message: "location doesn't exist"
  })
}

exports.creatLocation = async (req, res) => {
  try {
    const data = req.body
    const time = await locationModal.createLocationAsync(data)
    if (time.affectedRows > 0) {
      const getShowTime = await locationModal.getLocationByIdAsync(time.insertId)
      if (getShowTime.length > 0) {
        return res.json({
          success: true,
          message: 'Location create successfully',
          getShowTime: getShowTime[0]
        })
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Location create failed'
    })
  }
}

exports.updateLocation = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const update = await locationModal.updateLocation(id, data)
    console.log(update)
    if (update.affectedRows > 0) {
      const getMovie = await locationModal.getLocationByIdAsync(id)
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

exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params
    const initialResult = await locationModal.getLocationByIdAsync(id)
    if (initialResult.length > 0) {
      const results = await locationModal.deleteLocationByIdAsync(id)
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
