import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import Message from './Message'

import styles from './Navbar.module.css'

import { Context } from '../../context/UserContext'
import { useContext } from 'react'

function Navbar() {
  const { authenticated, logout } = useContext(Context)

  return (
    <nav className={styles.navbar}>
      <Link to='/' className={styles.navbar_logo}>
        {/* <img src={Logo} alt="My library" /> */}
        <h2>My Library.</h2>
      </Link>
      <Message/>
      <ul>
        <li>
          <Link to='/dashboard'>Books</Link>
        </li>
        { authenticated ? (
          <>
            <li>
              <Link to='/perfil'>Perfil</Link>
            </li>
            <li onClick={logout}>
              Logout
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Sign in</Link>
            </li>
            <li>
              <Link to='/register'>Sign up</Link>
            </li>
          </>
        ) 
      }
      </ul>
    </nav>
  )
}

export default Navbar