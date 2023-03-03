import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p><span className="bold">My Library</span> &copy; 2023 Developed by <span className='bold'>Fernando Otoni</span></p>
    </footer>
  )
}

export default Footer