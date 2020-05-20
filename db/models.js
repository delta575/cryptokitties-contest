const mongoose = require('mongoose')

// Define schema
const Schema = mongoose.Schema

const kittySchema = new Schema({
  _id: Number,
  votes: Number,
})

// Compile model from schema
const Kitty = mongoose.model('Kitty', kittySchema)

module.exports = { Kitty }
