const router = require('express').Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helper/verify-token')
const { imageUpload } = require('../helper/image-upload')

router.put('/edit/:id', imageUpload.single('image'), verifyToken, UserController.updateUser)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/checkuser', verifyToken, UserController.checkUser)
router.get('/:id', UserController.getUserById)

module.exports = router