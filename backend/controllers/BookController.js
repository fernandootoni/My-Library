const Book = require('../models/Book')
const Author = require('../models/Author')
const Comment = require('../models/Comment')

module.exports = class BookController {
  static async create(req, res) {
    const { name, category, description, author, pages, image } = req.body
    
    if(!name || !category || !description || !author || !pages)
      return res.status(422).json({ message: 'Fill all fields!'})

    const bookExist = await Book.findOne({ name: name })
    if(bookExist)
      return res.status(422).json({ message: 'Book already exists' })

    let authorExist = await Author.findOne({ name: author })
    if(!authorExist){
      const newAuthor = new Author({
        name: author
      })

      try {
        await newAuthor.save()
      } catch (error) {
        return res.status(422).status(500).json({ message: 'Something went wrong!'})
      }

      authorExist = await Author.findOne({ name: author })
    }

    const book = new Book({
      name,
      category,
      description,
      author: authorExist.name,
      author_id: authorExist._id,
      pages,
      rating: 0,
      image
    })

    try {
      await book.save()

      return res.status(422).status(201).json({ message: 'Book created!'})
    } catch (error) {
      return res.status(422).status(500).json({ message: 'Something went wrong!'})
    }
  }

  static async update(req, res) {
    const { name, category, description, author, pages, image } = req.body
    const id = req.params.id
    
    if(!name || !category || !description || !author || !pages)
      return res.status(422).json({ message: 'Fill all fields!'})

    const authorExist = await Author.findOne({ name: author })
    if(!authorExist)
      return res.status(422).json({ message: 'Insert a author that exist or create a new one!' })

    const book = await Book.findById({ _id: id })
    if(!book)
      return res.status(422).json({ message: 'Book not found!'})

    book.name = name
    book.category = category
    book.description = description
    book.author = {
      _id: authorExist._id,
      name: authorExist.name
    }
    book.pages = pages

    try {
      await Book.findOneAndUpdate(
        {_id: book._id},
        {$set: book},
        {new: true}
      )

      return res.status(201).json({ message: 'Book updated!' })
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong!' })
    }
  }

  static async allBooks(req, res) {
    const allBooks = await Book.find()

    return res.status(200).json( allBooks)
  }

  static async getBookById(req, res) {
    const id = req.params.id

    const book = await Book.findById(id)
    
    res.status(200).json(book)
  }
}