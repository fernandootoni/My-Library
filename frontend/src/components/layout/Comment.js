import styles from './Comment.module.css'

function Comment({username, userId, title, text, rating, id, user, SubmitDelete, image, bookname, bookId}){
  return (
    <section key={id} className={styles.comment_container}>
      <header>
        {image ? (
          <span 
            className={styles.img} 
            style={{
              backgroundImage: `url(${process.env.REACT_APP_API}/images/users/${image})`
            }}>
          </span>
        ) : (
          <img src="" alt="" />
        )} 
      </header>
      <div className={styles.info_container}>
        <h2>{username}</h2>
        <span><i class="bi bi-star"></i><span> {rating}</span>/10</span>
      </div>
      <main>
        {bookname !== '' ? (
          <div className={styles.title_container}>
            <h2>{title}</h2>
            <a href={`/books/${bookId}`}>Book - {bookname}</a>
          </div>
        ) : (
          <h2>{title}</h2>
        )}
        <input type="hidden" value={userId} />
        <p>{text}</p>
      </main>
      <form onSubmit={SubmitDelete} action="">
        {userId === user && (
          <span>
            <a href={`/comments/edit/${id}`}><i class="bi bi-pencil"></i></a>
            <button type='submit'><i class="bi bi-x-lg"></i></button>
            <input type='hidden' value={id}/>
          </span>
        )}
     </form>
    </section>
  )
}

export default Comment