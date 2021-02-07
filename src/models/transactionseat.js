const db = require('../helpers/db')

exports.createTransactionSeat = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO transactionseat
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

exports.createBulkTransactionSeat = async (id, data = []) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO transactionseat
    (idTransaction, idSeat)
    VALUES
    ${data.map(idSeat => `(${id}, ${idSeat})`).join()}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.checkTransactionSeat = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM transaction
    WHERE movie=${data.movie} AND date=${data.date} AND location=${data.location} AND time=${data.time} AND seats LIKE "%${data.seats}%"
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.checkTransactionSeatObject = (data) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM seats
    WHERE id IN (${data.map(item => item).join()})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteTransactionSeatByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM transactionseat WHERE idTransaction=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}
