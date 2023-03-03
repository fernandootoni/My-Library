const mongoose = require('../db/conn')
const { Schema } = mongoose

const Author = mongoose.model(
  'Author',
  new Schema({
    name: { type: 'string', required: true },
    description: { type: 'string'},
    books: Object,
    image: { type: 'string' }
  })
)

module.exports = Author