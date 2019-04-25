const express = require('express')
const routes = express.Router()
const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

// Using multer to handle file uploads
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')

// Configure the flash messages on the views
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/files/:file', FileController.show)

routes.get('/', SessionController.create)
routes.post('/signin', guestMiddleware, SessionController.store)
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/logout', SessionController.destroy)

// All routes that start with app are protected, so that the user is logged in
routes.use('/app', authMiddleware)

routes.get('/app/dashboard', DashboardController.index)

module.exports = routes
