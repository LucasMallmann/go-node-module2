const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

routes.get('/', (req, res) => res.send('Home'))
routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

module.exports = routes
