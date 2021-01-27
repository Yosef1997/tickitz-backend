const db = require('../helpers/db')

exports.createCinemaSchedule = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO cinemaschedule
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.createBulkCinemaSchedule = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO cinemaschedule
    (idCinemas, idShowTime)
    VALUES
    ${data.map(idGenre => `(${id}, ${idGenre})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.checkCinemaScheduleString = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM showtime
    WHERE id=${data}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.checkCinemaScheduleObject = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM showtime
    WHERE id IN (${data.map(item => item).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteCinemaScheduleByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM cinemaschedule WHERE idCinemas=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}
