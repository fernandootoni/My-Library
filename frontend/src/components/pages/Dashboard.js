import { useEffect, useState } from "react"
import api from "../../utils/api"
import BookCard from "../layout/BookCard"
import styles from './Dashboard.module.css'

function Dashboard() {
  const [books, setBooks] = useState([{}])
  const [search, setSearch] = useState('')
  const [searchBook, setSearchBook] = useState([])


  useEffect(() => {
    api.get('/books/dashboard')
    .then((response) => {
      return setBooks(response.data)
    })
    .catch((error) => {
      return console.log(error.data.message)
    })
  }, [books])

  function handleOnChange(e) {
    if(e.target.value === ''){
      setSearchBook([])
    }

    setSearch(e.target.value)
  }

  function searchingBook(e) {
    e.preventDefault()
    
    const newArray = books.filter(book => book.name.toLowerCase().includes(search) === true)
    setSearchBook(newArray)
  }

  return(
    <>
      <section className={styles.header_container}>
        <header>
          <h1>Books</h1>
          <p>Here you can search for all books or register a new one!</p>
        </header>
        <main>
          <a href="/books/add">Register a new one!</a>
          <form onSubmit={searchingBook} action="">
            <input onChange={handleOnChange} type="text" placeholder="Search here" />
            <input type="submit" value="Search"/>
          </form>
        </main>
      </section>
      <div className={styles.books_container}>
        {searchBook.length === 0 ? (
          books.map(book => (
            <BookCard 
              id={book._id}
              key={book._id} 
              name={book.name} 
              image={book.image}
              author={book.author}
              authorId={book.author_id}
              rating={Math.round(book.rating * 100)/100} 
              pages={book.pages}
              category={book.category}
            />
          ))
        ) : (
          searchBook.map(book => (
            <BookCard 
              id={book._id}
              key={book._id} 
              name= {book.name} 
              image={book.image}
              author={book.author}
              authorId={book.author_id}
              rating={Math.round(book.rating * 100)/100} 
              pages={book.pages}
              category={book.category}
            />
          ))
        )}
      </div>
    </>
  )
}

export default Dashboard