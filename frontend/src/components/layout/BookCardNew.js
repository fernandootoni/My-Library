import styles from './BookCardNew.module.css'

function BookCardNew({image, title, id, rating}) {
  return(
    <a className={styles.link} href={`/books/${id}`}>
      <section className={styles.content_shows}>
        <div>
          <img src={image} alt='alt' />
          <div className={styles.title_box}></div>
          <div className={styles.name}>
            {title}
            <div><i class="bi bi-star"></i><span> {rating}</span></div>
          </div>
        </div>
      </section>
    </a>
    
  )
}

export default BookCardNew