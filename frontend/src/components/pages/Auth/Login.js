import { useState, useContext } from 'react'
import { Context } from '../../../context/UserContext'
import Input from '../../form/Input'

import styles from '../../form/Form.module.css'

function Login() {
  const [user, setUser] = useState({})
  const {login} = useContext(Context) 

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value})
  }

  function submit(e) {
    e.preventDefault()

    login(user)
  }

  return (
    <section className={styles.login_container}>
      <h1>Login</h1>
      <form action="" onSubmit={submit}>
        <Input 
          type="email"
          name="email"
          placeholder="E-mail"
          handleOnChange={handleChange}
        />
        <Input 
          type="password"
          name="password"
          placeholder="Password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Sign In"/>
      </form>
    </section>
  )
}

export default Login