import Input from '../../form/Input'
import styles from './AddBook.module.css'
import { useState } from 'react'
import api from '../../../utils/api'

import { useNavigate } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

function AddBook() {
  const [book, setBook] = useState({})
  const [genre, setGenre] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  const [allGenres, setAllGenres] = useState([
    { name: "Action", selected: false },
    { name: "Adventure", selected: false  },
    { name: "Crime", selected: false  },
    { name: "Fantasy", selected: false  },
    { name: "Historical Fiction", selected: false  },
    { name: "Horror", selected: false },
    { name: "Mystery", selected: false  },
    { name: "Romance", selected: false  },
    { name: "Science Fiction", selected: false  },
    { name: "Thriller", selected: false },
  ])
  
  async function createBook(e){
    let msgType = 'success'
    e.preventDefault()

    const data = await api.post('books/add', {
      ...book,
      category: genre})
    .then((response) => {
      return response.data
    }).catch((error) => {
      msgType = 'error'
      return error.response.data
    })

    setFlashMessage(data.message, msgType)
    
    if(msgType=== 'success')
      navigate('/dashboard')
  }

  function handleOnChange(e) {
    setBook({...book, [e.target.name]: e.target.value})
  }

  function handleGenre(e) {
    if(genre.includes(e.target.innerText)){
      setGenre(genre.filter(genre => genre !== e.target.innerText))

      const index = allGenres.findIndex(genre => genre.name === e.target.innerText)
      allGenres[index].selected = false
      return
    }

    const index = allGenres.findIndex(genre => genre.name === e.target.innerText)
    allGenres[index].selected = true

    setGenre([...genre, e.target.innerText])
  }

  return(
    <>
      <section className={styles.container}>
        <header>
          <img src={book.image} alt="" />
          <Input
            name="image"
            placeholder="Book image URL"
            handleOnChange={handleOnChange}
          />
        </header>

        <main className={styles.register_container}>
          <h1>Register a new book</h1>
          <form onSubmit={createBook} action="">
            <Input
              type="text"
              name="name"
              placeholder="Book title"
              handleOnChange={handleOnChange}
            />
            <Input
              type="number"
              name="pages"
              placeholder="Number of pages"
              handleOnChange={handleOnChange}
            />
            <Input
              type="text"
              name="author"
              placeholder="Author"
              handleOnChange={handleOnChange}
            />
            <textarea placeholder='Book description' name="description" onChange={handleOnChange} cols="30" rows="10"></textarea>
            
            <div className={styles.buttons_container}>
              {
              allGenres.map(genre => (
                <button 
                  className={genre.selected ? styles.selected : styles.not_selected} 
                  onClick={handleGenre} 
                  type="button">{genre.name}
                </button>
              ))
              }
            </div>
            
            <input type="submit" value="Submit"/>
          </form>
        </main>
      </section>
    </>
  )
}

export default AddBook