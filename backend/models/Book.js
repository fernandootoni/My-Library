const mongoose = require('../db/conn')
const { Schema } = mongoose

const Book = mongoose.model(
  'Book',
  new Schema({
    name: { type: 'string', required: true },
    category: { type: Array},
    author: { type: 'string', required: true},
    author_id: { type: 'string', required: true},
    description: { type: 'string', required: true},
    rating: { type: 'number' },
    pages: { type: 'number', required: true},
    image: { type: 'string' }
  })
)

module.exports = Book