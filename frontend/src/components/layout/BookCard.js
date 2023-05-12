import styles from './BookCard.module.css'

function BookCard({name, author, authorId, rating, pages, image, id, category}) {
  return (
    <div className={styles.bookcard}>
      <a href={`/books/${id}`}>
        <div>
          <img src={image} alt="" />
        </div>
        {name?.length > 23 ? (
          <div className={styles.booknameLong}>
            <h2>{name}</h2>
          </div>
        ) : (
          <div className={styles.bookname}>
            <h2>{name}</h2>
          </div>
        )}
      </a>
      <a href={`/author/${authorId}`}>
        <h4>{author}</h4>
      </a>
      <div className={styles.spans}>
        <div><i class="bi bi-star"></i><span> {rating}</span>/10</div>
        <span><i class="bi bi-book"></i> {pages}</span>
      </div>
      <span className={styles.categories}>{category}</span>
    </div>
  )
}

export default BookCard