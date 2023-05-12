const router = require('express').Router()
const BookController = require('../controllers/BookController')
const verifyToken = require('../helper/verify-token')

router.post('/add', BookController.create)
router.patch('/update/:id', BookController.update)
router.get('/dashboard', BookController.allBooks)
router.get('/genre/:genre', BookController.getBookByGenre)
router.get('/:id', BookController.getBookById)

module.exports = router