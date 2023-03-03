import styles from './Home.module.css'

function Home() {
  return (
    <section className={styles.home_container}>
      <header>
        <h1><span className="bold">My Library.</span></h1>
        <p>Explore new worlds, meet new people and chat about your adventures.</p>
        <ul>
          <li>
            Talk about your favorite books.
          </li>
          <li>
            Discover new adventures.
          </li>
          <li>
            Connect with people from all over the world.
          </li>
        </ul>
      </header>
      <main>
        <img src="https://www.filamentpublishing.com/wp-content/uploads/2014/12/Books-montage-2.jpg" alt="" />
      </main>
    </section>
  )
}

export default Home