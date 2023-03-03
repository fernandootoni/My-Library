const CommentController = require('../controllers/CommentController');
const verifyToken = require('../helper/verify-token')

const router = require('express').Router();

router.post('/add', verifyToken, CommentController.create)
router.put('/update/:id', verifyToken, CommentController.update)
router.delete('/delete/:id', verifyToken, CommentController.delete)
router.get('/:id', verifyToken, CommentController.commentById)
router.get('/byuser/:id', CommentController.allCommentsByUser)
router.get('/bybook/:id', CommentController.allCommentsByBook)

module.exports = router