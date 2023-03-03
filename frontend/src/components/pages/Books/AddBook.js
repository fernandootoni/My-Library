import Input from '../../form/Input'
import styles from './AddBook.module.css'
import { useState } from 'react'
import api from '../../../utils/api'

import { useNavigate } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

function AddBook() {
  const [book, setBook] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  function handleOnChange(e) {
    setBook({...book, [e.target.name]: e.target.value})
    console.log(token)
  }

  async function createBook(e){
    let msgType = 'success'
    e.preventDefault()

    const data = await api.post('books/add', book,)
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
              type="text"
              name="category"
              placeholder="Categories"
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
            <input type="submit" value="Submit"/>
          </form>
        </main>
      </section>
    </>
  )
}

export default AddBook