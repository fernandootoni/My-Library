const Author = require('../models/Author')
const Book = require('../models/Book')

module.exports = class AuthorController {
  static async create(req, res) {
    const { name, description, books } = req.body
    if(!name || !description)
      return res.json({ message: 'Please fill all fields!'})

    const authorExists = await Author.findOne({ name: name})
    if(authorExists)
      return res.json({ message: 'Author already exists'})

    const author = new Author({
      name,
      description,
      books
    })
    await author.save()
    return res.status(201).json({ message: 'Author created!'})
  }

  static async update(req, res) {
    const id  = req.params.id
    const { name, description } = req.body

    if(!name || !description)
      return res.json({ message: 'Please fill all fields!'})

    const authorExists = await Author.findOne({ name: name })
    if(authorExists)
      return res.json({ message: 'Author name already in use!' })

    const author = await Author.findOne({ _id: id })
    author.name = name
    author.description = description

    try {
      await Author.findOneAndUpdate(
        { _id: author._id },
        { $set: author},
        { new: true }
      )

      res.status(200).json({ message: 'Author updated!'})
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' + error.message })
    }
  }

  static async getAllBooksByAuthor(req, res) {
    const id = req.params.id    

    const author = await Author.findById(id)
    if(!author)
      return res.status(422).json({ message: 'Author not found!' })

    const books = await Book.find({'author_id': author._id})

    return res.status(200).json(books)
  }

  static async getAllAuthors(req, res) {
    const authors = await Author.find()

    return res.status(200).json(authors)
  }

  static async getAuthor(req, res) {
    const id = req.params.id

    const author = await Author.findById(id)
    if(!author)
      return res.json({ message: 'Author not found!' })

    return res.status(200).json(author)
  }
}