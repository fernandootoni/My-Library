const mongoose = require('../db/conn')
const { Schema } = mongoose

const Comment = mongoose.model(
  'Comment',
  new Schema({
    userId: { type: String, required: true},
    userName: { type: String, required: true},
    bookId: { type: String, required: true},
    bookName: { type: String, required: true},
    title: { type: String, required: true},
    text: { type: String, required: true},
    rating: { type: Number, required: true},
    image: { type: String}
  })
)

module.exports = Comment