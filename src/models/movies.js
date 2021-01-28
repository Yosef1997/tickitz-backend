const db = require('../helpers/db')

exports.createMoviesAsync = (data = {}, cb) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO movies
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `"${item}"`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllMovies = () => {
  return new Promise((resolve, reject) => {
    const query = db.query('SELECT * FROM movies', (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getMovieByGenre = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM movies
    WHERE genre LIKE "%${cond}%"
    `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getMoviesByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM movies 
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

exports.getMovieByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM movies WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getMovieByIdWithGenreAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.id, m.name, m.releaseDate, g.genre, m.duration, m.description, m.director, m.stars, m.createdBy  
    FROM movies m
    INNER JOIN movierelation mr ON m.id=mr.idMovie
    INNER JOIN genre g ON g.id=mr.idGenre
    WHERE m.id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteMovieByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM movies WHERE id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateMovie = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE movies
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

exports.insertGenreinMovie = (id, data) => {
  return new Promise((resolve, reject) => {
    const dataGenre = data.join(', ')
    db.query(`
      UPDATE movies
      SET genre = "${dataGenre}"
      WHERE id=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

// exports.createMovies = (data = {}) => {
//   return new Promise((resolve, reject) => {
//     const query = db.query(`
//     INSERT INTO movies
//     (${Object.keys(data).join()})
//     VALUES
//     (${Object.values(data).map(item => `"${item}"`).join(',')})
//     `, (err, res, field) => {
//       if (err) throw err
//       console.log(field)
//       cb(res)
//     })
//     console.log(query.sql)
//   })
// }

exports.getMovieById = (id, cb) => {
  const query = db.query(`
    SELECT * FROM movies WHERE id=${id}
  `, (err, res, field) => {
    if (err) throw err
    // console.log(field)
    cb(res)
  })
  console.log(query.sql)
}

// exports.deleteMovieById = (id, cb) => {
//   const query = db.query(`
//     DELETE FROM movies WHERE id=${id}
//   `, (err, res, field) => {
//     if (err) throw err
//     // console.log(field)
//     cb(res)
//   })
//   console.log(query.sql)
// }
