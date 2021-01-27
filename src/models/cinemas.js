const db = require('../helpers/db')

exports.createCinema = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO cinemas
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

exports.getCinemaByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM cinemas
    WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCinemaByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM cinemas WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getCinemasByIdWithShowTimeAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT c.id, c.name, c.address, s.time, c.createdBy  
    FROM cinemas c
    INNER JOIN cinemaschedule cs ON c.id=cs.idCinemas
    INNER JOIN showtime s ON s.id=cs.idShowTime
    WHERE c.id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteCinemaByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM cinemas WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateCinema = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE cinemas
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}
exports.insertShowTimeinCinema = (id, data) => {
  return new Promise((resolve, reject) => {
    const dataShowtime = data.join(', ')
    db.query(`
      UPDATE cinemas
      SET time = "${dataShowtime}"
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

// exports.getAllCinemas = () => {
//   new Promise((resolve, reject) => {
//     const query = db.query('SELECT * FROM cinemas', (err, res, field) => {
//       if (err) reject(err)
//       console.log(field)
//       resolve(res)
//     })
//     console.log(query.sql)
//   })
// }
