const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const { APP_PORT } = process.env
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors('*'))

app.use('/uploads', express.static('uploads'))

// user
app.use('/movies', require('./src/routes/movies'))

app.use('/', require('./src/routes/showTime'))
app.use('/', require('./src/routes/location'))
app.use('/', require('./src/routes/seats'))
// admin
app.use('/admin/movies', require('./src/routes/movies'))
app.use('/admin/genre', require('./src/routes/genre'))
app.use('/admin/cinemas', require('./src/routes/cinemas'))
app.use('/', require('./src/routes/cinemas'))
app.use('/', require('./src/routes/movies'))
app.use('/auth', require('./src/routes/auth'))

// app.use('/test', require('./src/routes/routes'))

// app.get('/', (request, response) => {
//   const { username, password } = request.body
//   if (username === 'arka' && password === '1234') {
//     return response.json({ success: true, massage: 'correct username and password' })
//   } else {
//     return response.status(401).json({
//       success: false,
//       massage: 'Wrong username and password'
//     })
//   }
// })

app.listen(APP_PORT, () => {
  console.log(`App is running on port 8080 ${APP_PORT}`)
})
