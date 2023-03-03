import Input from "../../form/Input"
import { useContext, useState } from 'react'

import styles from '../../form/Form.module.css'
import { Link } from "react-router-dom"

import { Context } from '../../../context/UserContext'

function Register() {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    register(user)
  }

  return (
    <>
      <section className={styles.register_container}>
        <header>
          <h1>My Library.</h1>
          <p>Connect with people around the world, share experiences and much more.</p>
        </header>
        <main className={styles.form_container}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <Input
              text="Name"
              type="text"
              name="name"
              placeholder="Name"
              handleOnChange={handleChange} 
            />
            <Input
              text="Phone Number"
              type="text"
              name="phone"
              placeholder="Phone"
              handleOnChange={handleChange} 
            />
            <Input
              text="E-mail"
              type="email"
              name="email"
              placeholder="Email"
              handleOnChange={handleChange} 
            />
            <Input
              text="Password"
              type="password"
              name="password"
              placeholder="Password"
              handleOnChange={handleChange} 
            />
            <Input
              text="Confirm Password"
              type="password"
              name="confirmpassword"
              placeholder="Confirm your password"
              handleOnChange={handleChange} 
            />
            <input type="submit" value="Sign Up"/>
          </form>
          <p>Already on MyLibrary? <Link to='/login' className="bold">Sign In</Link></p>
        </main>
      </section>
    </>
  )
}

export default Register