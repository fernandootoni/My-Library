import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../utils/api'
import BookCard from '../../layout/BookCard'
import styles from '../Dashboard.module.css'
import stylesAuthor from './Author.module.css'

function Author() {
  const {id} = useParams()
  const [author, setAuthor] = useState({})
  const [books, setBooks] = useState([{}])
  
  useEffect(() => {
    api.get(`author/${id}`)
    .then((response) => {
      setAuthor(response.data)
      return response.data
    })
    .catch((error) => {
      console.log(error.response.data)
      return error.response.data
    })

    api.get(`author/getauthorbooks/${id}`)
    .then((response) => {
      return setBooks(response.data)
    })
    .catch((error) => {
      console.log(error.response.data)
      return error.response.data
    })
  }, [])

  return (
    <>
      <section className={stylesAuthor.author_container}>
        <img src="" alt="" />
        <h1>{author.name}</h1>
      </section>
      <section>
        <div className={styles.books_container}>
          {books.map((book) => (
            <BookCard 
            id={book._id}
            key={book._id} 
            name={book.name} 
            image={book.image}
            author={book.author}
            authorId={id}
            rating={Math.round(book.rating * 100)/100}
            pages={book.pages}
          />
          ))}
        </div>
      </section>
    </>
  )
}

export default Author