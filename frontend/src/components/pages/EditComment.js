import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../utils/api"
import styles from './Books/BookPage.module.css'
import useFlashMessage from "../../hooks/useFlashMessage"

function EditComment() {
  const {id} = useParams()
  const [token] = useState(localStorage.getItem('token') || '')
  const [comment, setComment] = useState({})
  const [newComment, setNewComment] = useState({})
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get(`/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        Accept: 'multipart/form-data'
      }
    })
    .then((response) => {
      return setComment(response.data.comment)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
  }, [])

  async function updateComment(e) {
    e.preventDefault()
    let msgType = 'error'

    const data = await api.put(`/comments/update/${id}`, newComment, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        Accept: 'multipart/form-data'
      }
    })
    .then((response) => {
      msgType = 'success'
      return response.data
    })
    .catch((error) => {
      msgType = 'error'
      return error.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  function handleOnChange(e) {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
  }

  return (
    <section className={styles.comment_form}>
      <h1>Editing comment!</h1>
      <form onSubmit={updateComment} action="">
        <input type="hidden" name="bookId" value={id} />
        <input onChange={handleOnChange} name="title" type="text" placeholder={comment.title}/>
        <input onChange={handleOnChange} name="rating" type="number" placeholder={comment.rating} min="0" max="10"/>
        <textarea onChange={handleOnChange} name="text" placeholder={comment.text} cols="30" rows="10"></textarea>
        <input type="submit" value="Update"/>
      </form>
    </section>
  )
}

export default EditComment