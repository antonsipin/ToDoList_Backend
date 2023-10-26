require('dotenv').config()
const express = require('express')
const session = require('express-session')
const createSocketServer = require('./socket')
const methodOverride = require('method-override')
const { createServer } = require('http')
const path = require('path')
const logger = require('morgan')
const indexRouter = require('./src/routes/index')
const taskRouter = require('./src/routes/task')
const userRouter = require('./src/routes/user')
const mainRouter = require('./src/routes/main')
const userMiddle = require('./src/middleware/user')
const dbConnect = require('./src/config/dbConnect')
const cors = require('cors')
const PORT = process.env.PORT || 3100

const app = express()
const server = createServer()
createSocketServer(server)
dbConnect()

app.set('session cookie name', 'sid')
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve('../frontend/build')))

app.use(
  session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
  })
)
app.use(methodOverride('_method'))
app.use(userMiddle.userName)
app.use('/', indexRouter)
app.use('/task', userMiddle.isAuth, taskRouter)
app.use('/user', userRouter)
app.use('*', mainRouter)

server.on('request', app)
server.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})

module.exports = app
