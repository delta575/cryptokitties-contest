const express = require('express')
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const db = require('../db')

const app = express()

app.use(bodyParser.json())

// Require API routes
const api = require('../api')

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Connect Db and listen the server
  db.connectDb().then(() => {
    app.listen(port, host)
  })

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}

start()
