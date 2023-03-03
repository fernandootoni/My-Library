import { useEffect, useState } from "react"
import api from "../../utils/api"
import Comment from "../layout/Comment"
import styles from './Perfil.module.css'

function Perfil() {
  const [user, setUser] = useState({})
  const [comments, setComments] = useState([{}])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      return setUser(response.data)
    })
    .catch((error) => {
      return console.log(error.response.data)
    })

    api.get(`comments/byuser/${user._id}`)
    .then((response) => {
      setComments(response.data.allComments)
    })
    .catch((error) => {
      return console.log(error.response.data)
    })

  }, [comments, user])

  return (
    <section className={styles.perfil_container}>
      <header>
        <h1>{user.name}</h1>
        <div className={styles.edit}><a href="/editperfil">Edit</a></div>
      </header>
        {comments.length > 0 ? ( comments.map(comment => (
          <Comment 
            rating={comment.rating}
            username={user.name}
            title={comment.title}
            text={comment.text}
            userId={comment.userId}
            id={comment._id}
            key={comment._id}
            bookname={comment.bookName}
            bookId={comment.bookId}
            image={user.image}
          />
        ))) : (
          <h2>{user.name} hasn't commented yet!</h2>
        )}
    </section>
  )
}

export default Perfil