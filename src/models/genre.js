const db = require('../helpers/db')

exports.createGenre = (data = {}, cb) => {
  const query = db.query(`
  INSERT INTO genre
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

exports.getAllGenre = (cb) => {
  const query = db.query('SELECT * FROM genre', (err, res, field) => {
    if (err) throw err
    console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.getGenreByCondition = (cond, cb) => {
  const query = db.query(`
    SELECT * FROM genre
    WHERE genre LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    LIMIT ${cond.limit} OFFSET ${cond.offset}
    `, (err, res, field) => {
    if (err) throw err
    // console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.getGenreById = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM genre WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getGenreByIdAsync = (id, cb) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM genre WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteGenreById = (id, cb) => {
  const query = db.query(`
    DELETE FROM genre WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    // console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.deleteGenreByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM genre WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateGenre = (id, data, cb) => {
  const key = Object.keys(data)
  const value = Object.values(data)
  const query = db.query(`
    UPDATE genre
    SET ${key.map((item, index) => `${item}="${value[index]}"`)}
    WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    // console.log(field)
    cb(res)
  })
  console.log(query.sql)
}
