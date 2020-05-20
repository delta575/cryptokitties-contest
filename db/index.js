require('dotenv').config()

const mongoose = require('mongoose')

const mongodb = process.env.DATABASE_URL

const connectDb = () =>
  mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

module.exports = { connectDb }
