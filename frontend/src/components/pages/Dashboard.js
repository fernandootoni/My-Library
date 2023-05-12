import { useEffect, useState } from "react"
import api from "../../utils/api"
import BookCard from "../layout/BookCardNew"
import styles from './Dashboard.module.css'
import BookCardNew from "../layout/BookCardNew"

function Dashboard() {
  const [books, setBooks] = useState([])
  const [defaultBooks, setDefaultBooks] = useState([])
  const [search, setSearch] = useState('')
  const [allGenres, setAllGenres] = useState([
    { name: "Action" },
    { name: "Adventure" },
    { name: "Crime" },
    { name: "Fantasy"  },
    { name: "Historical Fiction" },
    { name: "Horror" },
    { name: "Mystery" },
    { name: "Romance" },
    { name: "Science Fiction" },
    { name: "Thriller" },
  ])

  useEffect(() => {
    async function loadBooks() {
      const response = await api.get('/books/dashboard')

      setBooks(response.data)
      setDefaultBooks(response.data)
    }

    loadBooks()
  }, [])

  const sortByName = () => {
    const sort = books.sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    
    setBooks([...sort])
  }

  const sortByAuthor = () => {
    const sort = books.sort(function(a, b){
      let x = a.author.toLowerCase();
      let y = b.author.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });

    setBooks([...sort])
  }

  const sortByDate = async () => {
    const books = await api.get('/books/dashboard')

    setBooks([...books.data])
  }

  const handleOnChange = (e) => {
    if(e.target.value === ''){
      setBooks(defaultBooks)
    }

    setSearch(e.target.value.toLowerCase())
  }

  const searchingBook = (e) => {
    e.preventDefault()

    console.log(books)
    console.log(search)

    const newArray = defaultBooks.filter(book => book.name.toLowerCase().includes(search) === true)
    setBooks(newArray)
  }

  return(
    <>
      <section className={styles.header_container}>
        <header className={styles.header}>
          <h1>Our Bookshelf</h1>
        </header>

        <main className={styles.header_main}>
          <a href="/books/add">Register a new one!</a>
          <form onSubmit={searchingBook} action="">
            <input onChange={handleOnChange} type="text" placeholder="Search" />
            <input type="submit" value="Search"/>
          </form>        
        </main>

        <div className={styles.genres_button}>
          {
            allGenres.map(genre => (
              <a href={`#${genre.name}`}>{genre.name}</a>
            ))
          }
          </div>
        {/* <footer>
          <h2>Order by:</h2>
          <div className={styles.buttons_container}>
            <button onClick={sortByName} type="button">Name</button>
            <button onClick={() => sortByAuthor()} type="button">Author</button>
            <button onClick={() => sortByDate()} type="button">Date</button>
          </div>
          <div className={styles.genres}>
          </div>
        </footer> */}
      </section>
      {
        books === defaultBooks ? (
        <>
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
          {
            allGenres.map(genre => (
              <section id={genre.name}>
                <header className={styles.books_header}>
                  <h2>{genre.name}</h2>
                  <a href={`/books/genre/${genre.name}`}>See all</a>
                </header>
                <div className={styles.books_container}>
                  {
                    defaultBooks.filter(book => book.category.includes(genre.name))
                      .map(book => (
                        <BookCardNew 
                          key={book._id}
                          id={book._id}
                          title={book.name} 
                          image={book.image}
                          rating={Math.round(book.rating * 100)/100}
                        />
                      )
                    )
                  }
                </div>
              </section>
            ))
          }
        </>
        ) : (
          <h1></h1>
        )
      }
    </>
  )
}

export default Dashboard