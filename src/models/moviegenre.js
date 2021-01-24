const db = require('../helpers/db')

exports.createMovieGenre = (data = {}, cb) => {
  const query = db.query(`
  INSERT INTO movierelation
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

exports.checkGenres = (data, cb) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM genre
    WHERE id=${data}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.checkGenresAsync = (data = [], cb) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM genre
    WHERE id IN (${data.map(item => item).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.createBulkMovieGenres = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO movierelation
    (idMovie, idGenre)
    VALUES
    ${data.map(idGenre => `(${id}, ${idGenre})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
