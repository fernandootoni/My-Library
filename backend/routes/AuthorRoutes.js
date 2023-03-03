const router = require('express').Router()
const AuthorController = require('../controllers/AuthorController')
const verifyToken = require('../helper/verify-token')

router.get('/getauthorbooks/:id', AuthorController.getAllBooksByAuthor)
router.get('/getall', AuthorController.getAllAuthors)
router.get('/:id', AuthorController.getAuthor)
router.post('/add', AuthorController.create)
router.patch('/update/:id', AuthorController.update)

module.exports = router