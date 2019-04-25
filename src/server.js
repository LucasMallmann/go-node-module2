const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const session = require('express-session')
const LokiStore = require('connect-loki')(session)
const flash = require('connect-flash')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(
      session({
        name: 'root',
        store: new LokiStore({
          // Passar aonde vai salvar as sessoes
          path: path.resolve(__dirname, '..', 'tmp', 'sessions.db')
        }),
        secret: 'secret',
        resave: false,
        saveUninitialized: true
      })
    )
    this.express.use(flash())
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      watch: this.isDev,
      express: this.express
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
