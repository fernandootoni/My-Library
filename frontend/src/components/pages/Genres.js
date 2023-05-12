import { useEffect, useState } from "react"
import api from "../../utils/api"
import { useParams } from "react-router-dom"
import BookCardNew from "../layout/BookCardNew"
import styles from './Dashboard.module.css'

function Genres() {
  const [books, setBooks] = useState([])
  const [defaultBooks, setDefaultBooks] = useState([])
  const [search, setSearch] = useState('')
  const { genre } = useParams()

  useEffect(() => {
    async function loadBooksByGenre() {
      const response = await api.get(`/books/genre/${genre}`)

      setBooks(response.data)
      setDefaultBooks(response.data)
    }

    loadBooksByGenre()
  }, [books])
  
  const searchingBook = (e) => {
    e.preventDefault()

    const newArray = defaultBooks.filter(book => book.name.toLowerCase().includes(search) === true)
    setBooks(newArray)
  }

  const handleOnChange = (e) => {
    if(e.target.value === ''){
      setBooks(defaultBooks)
    }

    setSearch(e.target.value.toLowerCase())
  }

  return(
    <section className={styles.header_container}>
        <header className={styles.header}>
          <h1>{genre}</h1>
        </header>

        <main className={styles.header_main}>
          <a href="/books/add">Register a new one!</a>
          <form onSubmit={searchingBook} action="">
            <input onChange={handleOnChange} type="text" placeholder="Search" />
            <input type="submit" value="Search"/>
          </form>        
        </main>

        <h2 className={styles.genre_name}></h2>

        <section className={styles.books_sections}>
          <div className={styles.books_container}>
            {books.map(book => (
              <BookCardNew 
                key={book._id}
                id={book._id}
                title={book.name} 
                image={book.image}
                rating={Math.round(book.rating * 100)/100}
              />))
            }
          </div>
        </section>

        <div className={styles.footer_margin}></div>
        
      </section>
  )
}

export default Genres