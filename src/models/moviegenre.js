const db = require('../helpers/db')

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
// date string
exports.checkDate = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM showdate
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
// date Object
exports.checkDateAsync = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM showdate
    WHERE id IN (${data.map(item => item).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

// location object
exports.checklocationAsync = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM location
    WHERE id IN (${data.map(item => item).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

// cinema object
exports.checkCinemaAsync = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM cinemas
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

exports.createBulkMovieDate = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO moviedate
    (idMovie, idDate)
    VALUES
    ${data.map(idDate => `(${id}, ${idDate})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.createBulkMovieLocation = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO movielocation
    (idMovie, idLocation)
    VALUES
    ${data.map(idLocation => `(${id}, ${idLocation})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.createBulkMovieCinema = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO moviecinemas
    (idMovie, idCinema)
    VALUES
    ${data.map(idCinema => `(${id}, ${idCinema})`).join()}
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

exports.deleteMovieDateByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM moviedate WHERE idMovie=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteMovieLocationByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM movielocation WHERE idMovie=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteMovieCinemaByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM moviecinemas WHERE idMovie=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}
