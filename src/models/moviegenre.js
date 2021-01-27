const db = require('../helpers/db')

exports.createMovieGenre = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO movierelation
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

exports.checkGenres = (data) => {
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

exports.checkGenresAsync = (data) => {
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

exports.updateMovieGenre = (id, data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`  
      UPDATE movierelation
      SET idGenre=${data}
      WHERE idMovie=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteMovieGenreByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM movierelation WHERE idMovie=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}
