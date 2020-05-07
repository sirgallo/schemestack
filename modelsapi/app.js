const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')

const prestosRouter = require('./routes/prestos')
const schemasRouter = require('./routes/schemas')
const usersRouter = require('./routes/users')
const queriesRouter = require('./routes/queries')
const chartsRouter = require('./routes/charts')

const app = express();
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/prestos', prestosRouter)
app.use('/schemas', schemasRouter)
app.use('/users', usersRouter)
app.use('/queries', queriesRouter)
app.use('/charts', chartsRouter)

module.exports = app