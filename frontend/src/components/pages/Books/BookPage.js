import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../utils/api'
import Comment from '../../layout/Comment'
import styles from './BookPage.module.css'

import useFlashMessage from '../../../hooks/useFlashMessage'

function BookPage() {
  const [book, setBook] = useState({})
  const [comment, setComment] = useState({})
  const [comments, setComments] = useState([{}])
  const [token] = useState(localStorage.getItem('token') || '')
  const {id} = useParams()
  const [user, setUser] = useState({})
  const [logged, setLogged] = useState(true)
  const { setFlashMessage } = useFlashMessage() 

  let msgType = 'success'

  useEffect(() => {
    try {
      api.get(`books/${id}`)
      .then((response) => {
        setBook(response.data)
        return response.data
      })

      if(token === ''){
        setLogged(false)
      } else {
        api.get('users/checkuser', {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            Accept: 'multipart/form-data'
          }
        })
        .then((response) => {
          setUser(response.data)
          return response.data
        })
      }

      api.get(`comments/bybook/${id}`)
      .then((response) => {
        setComments(response.data.allComments)
        return response.data.allComments
      })
    } catch (error) { 
      console.log(error) 
    }
  }, [token, id])

  async function createComment(e) {
    msgType = 'success'

    const data = await api.post('comments/add', comment, {
    }).then((response) => {
      return response.data
    }).catch((error) => { 
      msgType = 'error'
      return error.response.data 
    })

    setFlashMessage(data.message, msgType)
  }

  async function deleteComment(e, id) {
    const data = await api.delete(`comments/delete/${id}`, {})
    .then((response) => { 
      return response.data 
    })
    .catch((error) => {
      msgType = 'error'
      return error.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  function handleOnChange(e) {
    setComment({...comment, [e.target.name]: e.target.value, bookId: id})
  }

  return(
    <>
      <section className={styles.bookinfo_container}>
        <header>
          <img src={book.image} alt={book.name} />
        </header>
        <main className={styles.bookinfo}>
          <h1>{book.name}</h1>
          <h3>Created by <a href={`/author/${book.author_id}`}>{book.author}</a></h3>
          <p>{book.description}</p>
          <div><i class="bi bi-star"></i><span> {book.rating}</span>/10</div>
          <div><i class="bi bi-book"></i> {book.pages}</div>
        </main>
      </section>
      {logged === true ? (
        <section className={styles.comment_form}>
          <h2>Leave your comment here!</h2>
          <form onSubmit={createComment} action="">
            <input type="hidden" name="bookId" value={id} />
            <input onChange={handleOnChange} name="title" type="text" placeholder="Title"/>
            <input onChange={handleOnChange} name="rating" type="number" placeholder="Your rating" min="0" max="10"/>
            <textarea onChange={handleOnChange} name="text" placeholder="Comment here!" cols="30" rows="10"></textarea>
            <input type="submit" />
          </form>
        </section>
      ) : (
        <section className={styles.comment_form}>
          <a href="/login">
            <h3><span>Login</span> to comment here</h3>
          </a>
        </section>
      )}
      <section className={styles.comment_section}>
        <header className={styles.comment_section_header}>
          <h2>All coments</h2>
          <h3>Comments({comments.length})</h3>
        </header>
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            id={comment._id}
            userId={comment.userId}
            username={comment.userName}
            image={comment.image}
            title={comment.title}
            text={comment.text}
            rating={comment.rating}
            user={user._id}
            bookname=""
            SubmitDelete={ (e) => deleteComment(e, comment._id)}
          />
        ))}
      </section>
    </>
  )
}

export default BookPage