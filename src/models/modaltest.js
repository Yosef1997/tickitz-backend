const db = require('../helpers/db')

exports.createGenreRelation = (data = {}, cb) => {
  const query = db.query(`
  INSERT INTO genrerelationn
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

exports.checkGenres = (data = [], cb) => {
  const query = db.query(`
  SELECT * FROM genrerelationn
  WHERE id IN (${data.map(item => item).join()})
  `, (err, res, field) => {
    if (err) throw err
    console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

exports.checkGenresAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM genrerelationn
    WHERE id IN (${data.map(item => item).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
