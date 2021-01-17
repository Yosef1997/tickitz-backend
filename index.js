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

// app.use('/movies', require('./src/routes/movies'))

// app.use('/movies/:id', require('./src/routes/movies'))

// app.use('/genre/:name', require('./src/routes/genre'))

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

// Get /movies/:id
// app.get('/movies/:id', (req, res) => {
//   const name = parseInt(req.params.id)
//   const data = require('./src/helpers/listMovies')
//   const results = data.find(movies => {
//     return movies.id === name
//   })
//   return res.json(results)
// })

// Get /genre/:name
// app.get('/genre/:name', (req, res) => {
//   const name = req.params.name
//   const data = require('./src/helpers/listMovies')
//   const results = data.filter(movies => {
//     return movies.genre.toLowerCase().includes(name.toLowerCase())
//   })
//   return res.json(results)
// })

// // // Get/cinemas
// app.get('/cinemas', (req, res) => {
//   // const { } = req.query
//   const listCinemas = require('./src/helpers/listCinemas')
//   return res.json(listCinemas)
// })

// // // Get/cinemas/:id
// app.get('/cinemas/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const detailCinemas = require('./src/helpers/listCinemas')
//   const results = detailCinemas.find(cinemas => {
//     return cinemas.id === id
//   })
//   return res.json(results)
// })

// Get/admin/movies
// app.get('/admin/movies', (req, res) => {
//   const dataAdmMovies = require('./src/helpers/listMovies')
//   return res.json(dataAdmMovies)
// })

// Get/admin/movies/:id
// app.get('/admin/movies/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const data = require('./src/helpers/listMovies')
//   const dataAdmMoviesId = data.find(movies => movies.id === id)
//   return res.json(dataAdmMoviesId)
// })

// Get/admin/genre
app.get('/admin/genre', (req, res) => {
  const data = require('./src/helpers/listMovies')
  const dataAdmGenre = data.map(movies => movies.genre)

  return res.json(dataAdmGenre)
})

// // Get/admin/genre/:id
// app.get('/admin/genre/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const data = require('./src/helpers/listMovies')
//   const dataAdmGenreId = data.find(movies => movies.id === id)
//   const results = [dataAdmGenreId.name, dataAdmGenreId.genre]
//   return res.json(results)
// })

// // // Get/admin/cinemas
// app.get('/admin/cinemas', (req, res) => {
//   const listAdmCinemas = require('./src/helpers/listCinemas')
//   return res.json(listAdmCinemas)
// })

// // // Get/admin/cinemas/:id
// app.get('/admin/cinemas/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const detailAdmCinemas = require('./src/helpers/listCinemas')
//   const results = detailAdmCinemas.find(cinemas => {
//     return cinemas.id === id
//   })
//   return res.json(results)
// })

app.listen(APP_PORT, () => {
  console.log(`App is running on port 8080 ${APP_PORT}`)
})
