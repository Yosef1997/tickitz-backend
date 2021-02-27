const db = require('../helpers/db')

exports.createTransaction = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO transaction
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

exports.getTransactionByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM transaction
    WHERE createdBy LIKE "%${cond.search}%"
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

exports.getTransactionByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * FROM transaction WHERE createdBy=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getTransactionByIdWithSeatAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT T.id, T.movie, T.showDate, T.location, T.showTime, T.category, T.seatCount, S.name as seatName, T.totalPrice, T.createdBy  
    FROM transaction T
    INNER JOIN transactionseat TS ON T.id=TS.idTransaction
    INNER JOIN seats ST ON ST.id=TS.idSeat
    WHERE c.id=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteTransactionByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM transaction WHERE createdBy=${id}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.updateTransaction = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data)
    const value = Object.values(data)
    const query = db.query(`
      UPDATE transaction
      SET ${key.map((item, index) => `${item}="${value[index]}"`)}
      WHERE createdBy=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}
exports.insertSeatsinTransaction = (id, data) => {
  return new Promise((resolve, reject) => {
    const idSeat = data.join(', ')
    db.query(`
      UPDATE transaction
      SET seatName = "${idSeat}"
      WHERE createdBy=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
