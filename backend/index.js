const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

app.use(express.static('public'))

const UserRoutes = require('./routes/UserRoutes')
const AuthorRoutes = require('./routes/AuthorRoutes')
const BookRoutes = require('./routes/BookRoutes')
const CommentRoutes = require('./routes/CommentRoutes')

app.use('/users', UserRoutes)
app.use('/author', AuthorRoutes)
app.use('/books', BookRoutes)
app.use('/comments', CommentRoutes)

app.listen(5000)