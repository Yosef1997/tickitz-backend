const db = require('../helpers/db')

exports.createCinema = (data = {}, cb) => {
  const query = db.query(`
  INSERT INTO cinemas
  (${Object.keys(data).join()})
  VALUES
  (${Object.values(data).map(item => `"${item}"`).join(',')})
  `, (err, res, field) => {
    if (err) throw err
    console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.getAllCinemas = (cb) => {
  const query = db.query('SELECT * FROM cinemas', (err, res, field) => {
    if (err) throw err
    console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.getCinemaByCondition = (cond, cb) => {
  const query = db.query(`
    SELECT * FROM cinemas
    WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
    if (err) throw err
    // console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.getCinemaById = (id, cb) => {
  const query = db.query(`
    SELECT * FROM cinemas WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    // console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.getCinemaByIdAsync = (id, cb) => {
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

exports.deleteCinemaById = (id, cb) => {
  const query = db.query(`
    DELETE FROM cinemas WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    // console.log(field)
    cb(res)
  })
  console.log(query.sql)
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

exports.updateCinema = (id, data, cb) => {
  const key = Object.keys(data)
  const value = Object.values(data)
  const query = db.query(`
    UPDATE cinemas
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    // console.log(field)
    cb(res)
  })
  console.log(query.sql)
}
