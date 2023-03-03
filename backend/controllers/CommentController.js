const Comment = require('../models/Comment')
const Book = require('../models/Book')

const getToken = require('../helper/get-token')
const getUserByToken = require('../helper/get-user-by-token')

module.exports = class CommentController {
  static async create(req, res) {
    const { title, text, rating, bookId } = req.body

    if(!title || !text || !bookId || !rating)
      return res.status(422).json({ message: 'Please fill all fields'})

    if(rating > 10 || rating < 0)
      return res.status(422).json({ message: 'Please insert a rating between 0 and 10' })

    const book = await Book.findById(bookId)
    if(!book)
      return res.status(422).json({ message: 'Book not found!' })

    const token = getToken(req)
    const user = await getUserByToken(token)

    const allCommentsFromUser = await Comment.find({ userId: user.id })

    let alreadyCommented = false
    allCommentsFromUser.forEach(comment => {
      if(comment.bookId === bookId)
        alreadyCommented = true
    })

    if(alreadyCommented)
      return res.status(422).json({ message: 'You already reviewed this book, try updating your review!'})

    const comment = new Comment({
      title,
      text,
      rating,
      bookId,
      bookName: book.name,
      userId: user.id,
      userName: user.name,
      image: user.image
    })

    try {
      await comment.save()
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong!'})
    }

    let allRating = 0
    let commentQty = 0;

    const allCommentsInThisBook = await Comment.find({bookId: bookId})
    allCommentsInThisBook.forEach((comment) => {
      allRating += comment.rating
      commentQty++
    })
    book.rating = allRating/commentQty

    try {
      await Book.findOneAndUpdate(
        {_id: book._id},
        {$set: book},
        {new: true}
      )
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong!'})
    }

    return res.status(201).json({ message: 'Comment created successfully!'})
  }

  static async update(req, res) {
    const { title, text, rating } = req.body
    const id = req.params.id

    if(!title || !text || !rating )
      return res.status(422).json({ message: 'Please fill all fields'})

    const comment = await Comment.findById(id)
    if(!comment)
      return res.status(422).json({ message: 'Comment not found!'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(comment.userId !== user.id)
      return res.status(500).json({ message: 'You cannot change this comment!'})

    comment.title = title
    comment.text = text
    comment.rating = rating

    try {
      await Comment.findOneAndUpdate(
        {_id: comment._id},
        {$set: comment},
        {new: true}
      )
    } catch (error) {
      return res.status(422).json({ message: 'Something went wrong!'})
    }

    const book = await Book.findById(comment.bookId)
    if(!book)
      return res.status(422).json({ message: 'Book not found!'})

    const allBookComments = await Comment.find({bookId: book._id})

    let bookRating = 0
    let commentsCount = 0
    allBookComments.forEach(comment => {
      bookRating += comment.rating
      commentsCount++
    })

    book.rating = bookRating/commentsCount

    try {
      await Book.findOneAndUpdate(
        {_id: book._id},
        {$set: book},
        {new: true}
      )
    } catch (error) {
      return res.status(422).json({ message: 'Something went wrong!'})
    }

    return res.status(200).json({ message: 'Comment updated successfully!'})
  }

  static async delete(req, res) {
    const id = req.params.id

    const comment = await Comment.findById(id)

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(comment.userId !== user.id)
      return res.json({ message: 'You cannot delete this comment!'})

    await Comment.findByIdAndDelete(id)

    return res.json({ message: 'Comment deleted successfully!' })
  }

  static async commentById(req, res) {
    const id = req.params.id

    const comment = await Comment.findById(id)
    if(!comment)
      return res.status(422).json({ message: 'Comment not found!'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(comment.userId !== user.id)
      return res.status(500).json({ message: 'You cannot change this comment!'})

    return res.status(200).json({ comment })
  }

  static async allCommentsByUser(req, res) {
    const id = req.params.id

    const allComments = await Comment.find({userId: id})
    
    return res.status(200).json({ allComments })    
  }

  static async allCommentsByBook(req, res) {
    const id = req.params.id

    const allComments = await Comment.find({bookId: id})
    
    return res.status(200).json({ allComments }) 
  }
}

